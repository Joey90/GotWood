TileEnums = {
	SEA: -1,
    DESERT: 0,
    WOOD: 1,
    BRICK: 2,
    WHEAT: 3,
    WOOL: 4,
    ORE: 5
}

BuildingEnums = {
	EMPTY: 0,
	VILLAGE: 1,
	CITY: 2
}

RoadOrientationEnums = {
	Vertical: 0,
	Rising: 1,
	Declining: 2
}

StateEnum = {
	IDLE: 0,
	OVERLAY_ACTIVE: 1,
}

Game = {
	LoadedStatus: {
		tiles: false,
		edges: false,
		vertices: false
	},
	State: [StateEnum.IDLE],
	TileLayer: [],
	BuildingLayer: [],
	OverlayLayer: [],
	UiLayer: [InfoWindow],
}

Config = {
    Graphics: {
    	canvasNames: {map: 'mapCanvas', buildings: 'buildingsCanvas', robber: 'robberCanvas', overlay: 'overlayCanvas', ui: 'uiCanvas'},
    	numVertices: 54,
    	numEdges   : 72, 
        xOffsets: [
        	2, 2, 2,
        	3, 3, 3, 3,
        	4, 4, 4, 4, 4,
        	3, 3, 3, 3, 
        	2, 2, 2
        ],
        yOffsets: [
        	-2, -2, -2,
        	-1, -1, -1, -1,
        	0, 0, 0, 0, 0,
        	1, 1, 1, 1,
        	2, 2, 2],
        spaces  : [0,1,2,0,1,2,3,0,1,2,3,4,0,1,2,3,0,1,2],
        startX  : 315,
        startY  : 155,
        length  : 80,
        portLength: 30,
        tiles   : [],
        portFill   : 'Gold',
        strokeStyle: 'Black',
        lineWidth  : 2,
        font       : '14pt Denk One',
        fontColor  : 'Black',
        textAlign  : 'center',
        teamColours: ['White', 'Red', 'Blue', 'Orange'],
        oceanFill  : 'RoyalBlue',
        villageSize: 15,
        citySize: 15,
        buildingShade: 'rgba(0,0,0,0.1)',
        diceNumCircleRadius: 25,
        diceNumCircleFill: 'SteelBlue',
        diceNumFont: '14pt Denk One',
        diceNumFontFill : 'Black',
        testPlacementAlpha: 0.5,
        overlayDebug: false,
        overlayDebugFill: 'rgba(100,0,0,0.4)',
        overlayDebugStroke: 'rgba(200,0,0,0.4)',
        forestCircleCount: 15,
        forestCircleMinSize: 20,
        forestCircleSizeRange: 30,
        forestCircleAlpha: 0.5,
        hillStripeCount: 10,
        hillStripeMinWidth: 10,
        hillStripeWidthRange: 40,
        hillStripeAlpha: 0.5,
        pastureCircleCount: 15,
        pastureCircleMinSize: 20,
        pastureCircleSizeRange: 35,
        pastureCircleMinWidth: 5,
        pastureCircleWidthRange: 5,
        pastureCircleAlpha: 0.3,
        fieldStripeCount: 10,
        fieldStripeMinWidth: 10,
        fieldStripeWidthRange: 50,
        fieldStripeAlpha: 0.25,
        mountainCircleCount: 50,
        mountainCircleMinSize: 3,
        mountainCircleSizeRange: 10,
        mountainCircleAlpha: 0.5
    },
    Resources: [],
    LoadingLines: [
    	"\"Randomising\" the distribution of brick...",
    	"Performing questionable acts with sheep...",
    	"Collecting gratuitous amounts of wood...",
    	"Phone off the hook, shirt off, pants off, time to Catan!"
    ]
}

Config.Graphics.tiles[TileEnums.DESERT] = { fill: 'LightGoldenrodYellow', label: 'Desert' };
Config.Graphics.tiles[TileEnums.WOOD]   = { fill: 'DarkGreen', label: 'Forest' };
Config.Graphics.tiles[TileEnums.BRICK]  = { fill: 'FireBrick', label: 'Hill' };
Config.Graphics.tiles[TileEnums.WHEAT]  = { fill: 'Wheat', label: 'Field' };
Config.Graphics.tiles[TileEnums.WOOL]   = { fill: 'PaleGreen', label: 'Pasture' };
Config.Graphics.tiles[TileEnums.ORE]    = { fill: 'Silver', label: 'Mountain' };

Config.Resources[TileEnums.DESERT] = {name: 'Nothing' };
Config.Resources[TileEnums.WOOD]  = { name: 'Wood' };
Config.Resources[TileEnums.BRICK] = { name: 'Brick' };
Config.Resources[TileEnums.WHEAT] = { name: 'Wheat' };
Config.Resources[TileEnums.WOOL]  = { name: 'Wool' };
Config.Resources[TileEnums.ORE]   = { name: 'Ore' };

TestingData = {
    portData : [
        { startVertex: 0, endVertex: 1,   resource: TileEnums.DESERT },
        { startVertex: 3, endVertex: 4,   resource: TileEnums.WOOL },
        { startVertex: 17, endVertex: 7,  resource: TileEnums.ORE },
        { startVertex: 14, endVertex: 15, resource: TileEnums.DESERT },
        { startVertex: 26, endVertex: 37, resource: TileEnums.DESERT },
        { startVertex: 38, endVertex: 28, resource: TileEnums.WHEAT },
        { startVertex: 46, endVertex: 45, resource: TileEnums.BRICK },
        { startVertex: 48, endVertex: 47, resource: TileEnums.DESERT },
        { startVertex: 51, endVertex: 50, resource: TileEnums.WOOD },
        
    ]
}