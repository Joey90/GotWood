ctx = null;

document.onready = function () {
	ctx = document.getElementById('mapCanvas').getContext('2d');
}

function addSettlement(vertex, team) {
	var index = Game.BuildingLayer.push(new Settlement(vertex, team));
	Game.BuildingLayer[index-1].draw(ctx);
}

function addCity(vertex, team) {
	var index = Game.BuildingLayer.push(new City(vertex, team));
	Game.BuildingLayer[index-1].draw(ctx);
}

function addRoad(edge, team) {
	var index = Game.BuildingLayer.push(new Road(edge, team));
	Game.BuildingLayer[index-1].draw(ctx);
}

function hideOverlay() {
	Game.OverlayLayer = new Array();
	if(Game.State[Game.State.length - 1] == StateEnum.OVERLAY_ACTIVE)
		Game.State.pop();
}

function showRoadOverlay(team) {
	hideOverlay();
	
	Game.State.push(StateEnum.OVERLAY_ACTIVE);
	
	for(var i = 0; i < Config.Graphics.numEdges; i++) {
		Game.OverlayLayer.push(new OverlayHexagon(
			new Road(i, team)
		));
	}
}

function showBuildingOverlay(team, buildingType) {
	hideOverlay();
	
	Game.State.push(StateEnum.OVERLAY_ACTIVE);
	
	for(var i = 0; i < Config.Graphics.numVertices; i++) {
		var settlement = null;
		if(buildingType == BuildingEnums.VILLAGE) {
			settlement = new Settlement(i, team);
		} else if(buildingType == BuildingEnums.CITY) {
			settlement = new City(i, team);
		}
		
		Game.OverlayLayer.push(
			new OverlayHexagon(settlement)
		);
	}
}

function toggleOverlayDebug() {
	Config.Graphics.overlayDebug = !Config.Graphics.overlayDebug;
}
