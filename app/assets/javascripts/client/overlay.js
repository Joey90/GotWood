function buildPlaceBuildingOverlay(building, team, early) {
	$.ajax({
	   url: '/game/valid_build_locations/' + team + '/' + building + '/' + ((early) ? '1':'0'),
	   success: function(data) {
	       
	       // Reset the overlay
	       hideOverlay();
	       Game.State.push(StateEnum.OVERLAY_ACTIVE);
	       
	       // Add the overlay hexagons at the valid build locations
	       for(var i = 0; i < data.length; i++) {
	           var structure = null;
	           
	           switch(building) {
	               case BuildingEnums.VILLAGE:
	                   structure = new Settlement(data[i], team);
	                   break;
	               case BuildingEnums.CITY: 
	                   structure = new City(data[i], team);
	                   break;
	               case BuildingEnums.ROAD:
	                   structure = new Road(data[i], team);
	                   break;
	           }
	           
	           Game.OverlayLayer.push(new OverlayHexagon(structure));
	       }
	       
	       // Construct the callback function
	       Game.OverlayCallback = placeStructureCallback;
	       Game.OverlayCallbackArgs = {building: building, team: team};
	       
	       redrawOverlay();
	   } 
	});
}

function buildPlaceRobberOverlay() {
    // Deduce location of robber
    var locations = [];
    
    hideOverlay();
    Game.State.push(StateEnum.OVERLAY_ACTIVE);
    
    Game.RobberLayer.forEach(function(rob) {
        locations.push(rob.tile);
    });
    
    for(var i = 0; i < Config.Graphics.numTiles; i++) {
        if(locations.indexOf(i) == -1) {
            Game.OverlayLayer.push(new OverlayHexagon(new Robber(i)));
        }
    }
    
    Game.OverlayCallback = placeRobberCallback;
    Game.OverlayCallbackArgs = {locations: locations};
    
    redrawOverlay();
}

function hideOverlay() {
    Game.OverlayLayer = [];
    if(Game.State[Game.State.length - 1] == StateEnum.OVERLAY_ACTIVE)
        Game.State.pop();
    redrawOverlay();
}

function placeStructureCallback(hex, args) {
    
    // TODO: Tell the server about the chosen location, for now, emulate
    console.log("Emulating structure update.");
    switch(args.building) {
        case BuildingEnums.VILLAGE:
        case BuildingEnums.CITY:
            Game.verticesData[hex.struct.vertex].building = args.building;
            Game.verticesData[hex.struct.vertex].team = args.team;
            break;
        case BuildingEnums.ROAD:
            Game.edgesData[hex.struct.edge].road = true;
            Game.edgesData[hex.struct.edge].team = args.team;
    }
    
    updateGameData();
    redrawBuildings();
}

function placeRobberCallback(hex, args) {
    
    // TODO: Tell the server the chosen location, for now, emulate
    console.log("Emulating robber update.");
    for(var i = 0; i < args.locations.length; i++) {
        Game.tileData[args.locations[i]].robber = false;
    }
    Game.tileData[hex.struct.tile].robber = true;
    
    updateGameData();
    redrawRobber();
}
