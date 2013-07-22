function init() {
    var canvas = document.getElementById('mapCanvas');
    var ctx = canvas.getContext('2d');

    WebFontConfig = {
        google: { families: [ 'Cantora One' ] },
        active: function() {drawLoadingScreen(ctx); console.log('Loaded font'); Game.LoadedStatus.font = true; continueLoading();}
    };

    resizeCanvases();

    fetchTileData(continueLoading);
    fetchEdgeData(continueLoading);
    fetchVertexData(continueLoading);
}

function fetchTileData(callback) {
    $.ajax({
        url: '/game/tiles',
        success: function(data) {
            Game.tileData = data;
            Game.LoadedStatus.tiles = true;
            console.log("Game tile data updated.");
        },
        complete: callback
    });
}

function fetchEdgeData(callback) {
    $.ajax({
        url: '/game/edges',
        success: function(data) {
            Game.edgesData = data;
            Game.LoadedStatus.edges = true;
            console.log("Game edge data updated.");
        },
        complete: callback
    });
}

function fetchVertexData(callback) {
    $.ajax({
        url: '/game/vertices',
        success: function(data) {
            Game.verticesData = data;
            Game.LoadedStatus.vertices = true;
            console.log("Game vertex data updated.");
        },
        complete: callback
    });
}

// See if we have all the data, and start drawing the game if we have
function continueLoading() {
    if ( Game.LoadedStatus.vertices && Game.LoadedStatus.edges && Game.LoadedStatus.tiles && Game.LoadedStatus.font) {
        window.onresize = function() {
            resizeCanvases();
            updateGameData();
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
    Game.TileLayer = [];
    Game.RobberLayer = [];
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
                var hex = new HillHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
                break;
            case TileEnums.WOOL:
                var hex = new PastureHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
                break;
            case TileEnums.WHEAT:
                var hex = new FieldHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
                break;
            case TileEnums.ORE:
                var hex = new MountainHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
                    Game.tileData[i].dice_number,
                    Game.tileData[i].robber
                );
                break;
            case TileEnums.DESERT:
                var hex = new DesertHexagon(
                    Config.Graphics.length,
                    pos.x,
                    pos.y,
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
        if(Game.tileData[i].robber) {
            Game.RobberLayer.push(new Robber(i));
        }
        Game.TileLayer.push(hex);
    }

    Game.BuildingLayer = [];

    // Do similarly for roads
    for(var i = 0; i < Game.edgesData.length; i++) {
        if(Game.edgesData[i].road) {
            Game.BuildingLayer.push(new Road(i, Game.edgesData[i].team));
        }
    }
    // And for settlements/cities
    for(var i = 0; i < Game.verticesData.length; i++) {
        if(Game.verticesData[i].building == BuildingEnums.SETTLEMENT) {
            Game.BuildingLayer.push(new Settlement(i, Game.verticesData[i].team));
        } else if(Game.verticesData[i].building == BuildingEnums.CITY) {
            Game.BuildingLayer.push(new City(i, Game.verticesData[i].team));
        }
    }


    // Construct the various UI elements
    Game.UiLayer.infoWindow = new InfoWindow();
    Game.UiLayer.testingWin = new CollapsableWindow(400, 50, 5, true, 'Testing Window', WindowTabLocationEnum.TOP_LEFT, false);
}

function resizeCanvases() {
    for(var k in Config.Graphics.canvasNames) {
        var canvas = document.getElementById(Config.Graphics.canvasNames[k]);
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    }

    if(
        document.documentElement.clientWidth < 946
     || document.documentElement.clientHeight < 920
    ) {
        Config.Graphics.scale = Math.min(
            document.documentElement.clientWidth / 946,
            document.documentElement.clientHeight / 920 );
    } else {
        Config.Graphics.scale = 1;
    }

    Config.Graphics.startX = (document.documentElement.clientWidth / 2) / Config.Graphics.scale;
    Config.Graphics.startY = (document.documentElement.clientHeight / 2) / Config.Graphics.scale;

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
    redrawRobber();
    redrawUi();
}

function redrawMap() {
    var name = Config.Graphics.canvasNames.map;
    var ctx = document.getElementById(name).getContext('2d');
    clearCanvas(name);

    ctx.scale(Config.Graphics.scale, Config.Graphics.scale);

    drawMap(ctx);
    drawPorts(ctx, TestingData.portData);
}

function redrawBuildings() {
    var name = Config.Graphics.canvasNames.buildings;
    var ctx = document.getElementById(name).getContext('2d');
    clearCanvas(name);

    ctx.save();
    ctx.scale(Config.Graphics.scale, Config.Graphics.scale);

    for(var i = 0; i < Game.BuildingLayer.length; i++) {
        Game.BuildingLayer[i].draw(ctx);
    }
    ctx.restore();
}

function redrawOverlay() {
    var name = Config.Graphics.canvasNames.overlay;
    var ctx = document.getElementById(name).getContext('2d');
    clearCanvas(name);

    ctx.save();
    ctx.scale(Config.Graphics.scale, Config.Graphics.scale);

    for(var i = 0; i < Game.OverlayLayer.length; i++) {
        Game.OverlayLayer[i].draw(ctx);
    }

    ctx.restore();
}

function redrawRobber() {
    var name = Config.Graphics.canvasNames.robber;
    var ctx = document.getElementById(name).getContext('2d');
    clearCanvas(name);

    ctx.save();
    ctx.scale(Config.Graphics.scale, Config.Graphics.scale);

    for(var i = 0; i < Game.RobberLayer.length; i++) {
        Game.RobberLayer[i].draw(ctx);
    }

    ctx.restore();
}

function redrawUi() {
    var name = Config.Graphics.canvasNames.ui;
    var ctx = document.getElementById(name).getContext('2d');
    clearCanvas(name);

    ctx.save();
    ctx.scale(Config.Graphics.scale, Config.Graphics.scale);

    for(var x in Game.UiLayer ) {
        Game.UiLayer[x].draw(ctx);
    }

    ctx.restore();
}

// Loading screen
function drawLoadingScreen(ctx) {
    ctx.font = '46pt Cantora One, sans-serif';
    ctx.fillStyle = 'Black';
    ctx.textAlign = 'center';

    ctx.fillText('Got Wood?', Config.Graphics.startX, Config.Graphics.startY);

    ctx.save();
    ctx.translate(0, 50);

    var randNum = Math.floor(Math.random() * Config.LoadingLines.length);
    var textLine = Config.LoadingLines[randNum];
    console.log(textLine);

    ctx.font = '16pt Cantora One, sans-serif';
    ctx.fillText(textLine, Config.Graphics.startX, Config.Graphics.startY);
}
