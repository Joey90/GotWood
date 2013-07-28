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
	               case BuildingEnums.SETTLEMENT:
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
	       
	       // Add the OverlayInfoWindow
	       Game.UiLayer.overlayInfoWindow = new OverlayInfoWindow(true, building, true);
	       
	       redrawOverlay();
	       redrawUi();
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
    
    // Add the OverlayInfoWindow
    Game.UiLayer.overlayInfoWindow = new OverlayInfoWindow(false);

    redrawOverlay();
    redrawUi();
}

function hideOverlay() {
    Game.OverlayLayer = [];
    delete Game.UiLayer.overlayInfoWindow;
    
    if(Game.State[Game.State.length - 1] == StateEnum.OVERLAY_ACTIVE)
        Game.State.pop();

    redrawOverlay();
    redrawUi();
}

function placeStructureCallback(hex, args) {
    
    switch(args.building) {
        case BuildingEnums.SETTLEMENT:
            $.ajax({
                url: '/game/build_settlement',
                data: 'vertex_id='+hex.struct.vertex,
                success: function(data) {
                    if (data == 'built') {
                        console.log('Built Settlement!');
                        fetchVertexData(function() {
                            updateGameData();
                            redrawBuildings();
                            redrawUi();
                        });
                    } else {
                        console.log('Build Failed!');
                    }
                }
            });
            break;
        case BuildingEnums.CITY:
            $.ajax({
                url: '/game/build_city',
                data: 'vertex_id='+hex.struct.vertex,
                success: function(data) {
                    if (data == 'built') {
                        console.log('Built City!');
                        fetchVertexData(function() {
                            updateGameData();
                            redrawBuildings();
                            redrawUi();
                        });
                    } else {
                        console.log('Build Failed!');
                    }
                }
            });
            break;
        case BuildingEnums.ROAD:
            $.ajax({
                url: '/game/build_road',
                data: 'edge_id='+hex.struct.edge,
                success: function(data) {
                    if (data == 'built') {
                        console.log('Built Road!');
                        fetchEdgeData(function() {
                            updateGameData();
                            redrawBuildings();
                            redrawUi();
                        });
                    } else {
                        console.log('Build Failed!');
                    }
                }
            });
            break;
    }
}

function placeRobberCallback(hex, args) {
    $.ajax({
        url: '/game/move_robber',
        data: 'tile_id='+hex.struct.tile,
        success: function(data) {
            if (data == 'robber moved') {
                console.log('Moved Robber!');
                fetchTileData(function() {
                    updateGameData();
                    redrawRobber();
                    redrawUi();
                });
            } else {
                console.log('Failed to move Robber!');
            }
        }
    });
}
