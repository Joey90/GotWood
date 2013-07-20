function init() {
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	
	resizeCanvases();
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
		window.onresize = function() {
			updateCanvases();
			redrawAll();
		};
		
		resizeCanvases();
		registerMouseHandlers();
		updateGameData();
		
		// Draw the various layers
		redrawAll();
	}
}

function updateGameData() {
	Game.TileLayer = new Array();
	// Add the Sea hexagon to the tile layer
	Game.TileLayer.push(new SeaHexagon());
	// Process the tiles into hexagons
	for(var i = 0; i < Game.tileData.length; i++) {
		var pos = tileCoordinates(i);

        switch (Game.tileData[i].resource) {
            case TileEnums.WOOD:
                var hex = new ForestHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
                break;
            case TileEnums.BRICK:
                var hex = new BrickHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
                break;
            default:
                var hex = new TileHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].resource,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
        }
			
		Game.TileLayer.push(hex);
	}
	
	Game.BuildingLayer = new Array();
	
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
	
	
	// Add the info window
	Game.UiLayer = new Array();
	Game.UiLayer.push(InfoWindow);
}

function resizeCanvases() {
	for(var k in Config.Graphics.canvasNames) {
		var canvas = document.getElementById(Config.Graphics.canvasNames[k]);
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight - 2;
	}
	Config.Graphics.startX = document.documentElement.clientWidth / 2;
	Config.Graphics.startY = document.documentElement.clientHeight / 2 - 1;
}

function clearCanvas(name) {
	var canvas = document.getElementById(name);
	var ctx = canvas.getContext('2d');
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawAll() {
	redrawMap();
	redrawBuildings();
	redrawOverlay();
	redrawUi();
}

function redrawMap() {
	var name = Config.Graphics.canvasNames.map;
	var ctx = document.getElementById(name).getContext('2d');
	clearCanvas(name);
	
	drawMap(ctx);
	drawPorts(ctx, TestingData.portData);
}

function redrawBuildings() {
	var name = Config.Graphics.canvasNames.buildings;
	var ctx = document.getElementById(name).getContext('2d');
	clearCanvas(name);
	
	for(var i = 0; i < Game.BuildingLayer.length; i++) {
		Game.BuildingLayer[i].draw(ctx);
	}
}

function redrawOverlay() {
	var name = Config.Graphics.canvasNames.overlay;
	var ctx = document.getElementById(name).getContext('2d');
	clearCanvas(name);
	
	for(var i = 0; i < Game.OverlayLayer.length; i++) {
		Game.OverlayLayer[i].draw(ctx);
	}
}

function redrawUi(ctx) {
	var name = Config.Graphics.canvasNames.ui;
	var ctx = document.getElementById(name).getContext('2d');
	clearCanvas(name);
	
	for(var i = 0; i < Game.UiLayer.length; i++ ) {
		Game.UiLayer[i].draw(ctx);
	}
}

// Loading screen
function drawLoadingScreen(ctx) {
	ctx.font = '46pt Denk One';
	ctx.fillStyle = 'Black';
	ctx.textAlign = 'center';
	
	ctx.fillText('Got Wood?', Config.Graphics.startX, Config.Graphics.startY);
	
	ctx.save();
	ctx.translate(0, 50);
	
	var randNum = Math.round( Math.random() * Config.LoadingLines.length + 1 ) - 1;
	var textLine = Config.LoadingLines[randNum];
	console.log(textLine);
	
	ctx.font = '16pt Denk One';
	ctx.fillText(textLine, Config.Graphics.startX, Config.Graphics.startY);
}
