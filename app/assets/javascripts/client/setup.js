function init() {
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	
	resizeCanvas();
	drawLoadingScreen(ctx);

	$.ajax({
		url: '/game/tiles',
		success: function(data) {
			Game.tileData = data;
			Game.LoadedStatus.tiles = true;
			console.log("Game tile data updated.");
		},
		complete: continue_loading
	});
	
	$.ajax({
		url: '/game/edges',
		success: function(data) {
			Game.edgesData = data;
			Game.LoadedStatus.edges = true;
			console.log("Game edge data updated.");
		},
		complete: continue_loading
	});
	
	$.ajax({
		url: '/game/vertices',
		success: function(data) {
			Game.verticesData = data;
			Game.LoadedStatus.vertices = true;
			console.log("Game vertex data updated.");
		},
		complete: continue_loading
	})
}

// See if we have all the data, and start drawing the game if we have
function continue_loading() {
	if ( Game.LoadedStatus.vertices && Game.LoadedStatus.edges && Game.LoadedStatus.tiles ) {
		window.onresize = updateCanvas;
		updateCanvas();
	}
}

function updateCanvas() {
	
	resizeCanvas();
		
	Game.TileLayer = new Array();
	// Add the Sea hexagon to the tile layer
	Game.TileLayer.push(new SeaHexagon());
	// Process the tiles into hexagons
	for(var i = 0; i < Game.tileData.length; i++) {
		var pos = tileCoordinates(i);
		var hex = new Hexagon(Config.Graphics.length,
			pos.x, pos.y,
			Game.tileData[i].resource);
			
		Game.TileLayer.push(hex);
	}
	
	// Do similarly for roads
	for(var i = 0; i < Game.edgesData; i++) {
		if(Game.edgesData[i].road) {
			Game.BuildingLayer.push(new Road(i, Game.edgesData[i].team));
		}
	}
	// And for settlements/cities
	for(var i = 0; i < Game.verticesData; i++) {
		if(Game.verticesData[i].building == BuildingEnums.VILLAGE) {
			Game.BuildingLayer.push(new Settlement(i, Game.verticesData[i].team));
		} else if(Game.verticesData[i].building == BuildingEnums.CITY) {
			Game.BuildingLayer.push(new City(i, Game.verticesData[i].team));
		}
	}
	
	var ctx = document.getElementById('mapCanvas').getContext('2d');
	redrawCanvas(ctx);
}

function resizeCanvas() {
	var canvas = document.getElementById('mapCanvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight - 2;
	
	Config.Graphics.startX = canvas.width / 2;
	Config.Graphics.startY = canvas.height/ 2;
}

function redrawCanvas(ctx) {
	redrawMap(ctx);
	redrawBuildings(ctx);
}

// Loading screen
function drawLoadingScreen(ctx) {
	ctx.font = '46pt Denk One';
	ctx.fillStyle = 'Black';
	ctx.textAlign = 'center';
	
	ctx.fillText('Got Wood?', Config.Graphics.startX, Config.Graphics.startY);
	
	ctx.save();
	ctx.translate(0, 50);
	
	ctx.font = '16pt Denk One';
	ctx.fillText('"Randomising" the distribution of brick...', Config.Graphics.startX, Config.Graphics.startY);
}
