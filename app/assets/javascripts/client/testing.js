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
