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
	IDLE: 0
}

Game = {
	LoadedStatus: {
		tiles: false,
		edges: false,
		vertices: false,
		ports: false
	},
	State: [StateEnum.IDLE],
	TileLayer: [],
	BuildingLayer: []
}

Config = {
    Graphics: {
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
        lineWidth  : 1,
        font       : '20px Denk One',
        fontColor  : 'Black',
        textAlign  : 'center',
        teamColours: ['White', 'Red', 'Blue', 'Orange'],
        villageSize: 15,
        citySize: 15,
        buildingShade: 'rgba(0,0,0,0.1)',
    },
    Resources: []
}

Config.Graphics.tiles[TileEnums.SEA]    = { fill: 'RoyalBlue', label: '' };
Config.Graphics.tiles[TileEnums.DESERT] = { fill: 'LightGoldenrodYellow', label: 'DESERT' };
Config.Graphics.tiles[TileEnums.WOOD]   = { fill: 'DarkGreen', label: 'FOREST' };
Config.Graphics.tiles[TileEnums.BRICK]  = { fill: 'FireBrick', label: 'HILL' };
Config.Graphics.tiles[TileEnums.WHEAT]  = { fill: 'Wheat', label: 'FIELD' };
Config.Graphics.tiles[TileEnums.WOOL]   = { fill: 'PaleGreen', label: 'PASTURE' };
Config.Graphics.tiles[TileEnums.ORE]    = { fill: 'Silver', label: 'MOUNTAIN' };

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