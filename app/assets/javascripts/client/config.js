TileEnums = {
    DESERT: 0,
    WOOD: 1,
    BRICK: 2,
    WHEAT: 3,
    WOOL: 4,
    ORE: 5
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
        oceanFill  : 'RoyalBlue',
        portFill   : 'Gold',
        strokeStyle: 'Black',
        lineWidth  : 1,
        font       : '20px Denk One',
        fontColor  : 'Black',
        textAlign  : 'center'
    },
    Ports: {
        locations : [0, 1, 3, 6, 11, 12, 15, 16, 17],
        anchor    : [5, 0, 4, 0, 1, 4, 2, 3, 2]
    }, 
    Resources: []
}

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
    tileData : [
        { tile: TileEnums.WOOD, number: 11 },
        { tile: TileEnums.WOOL, number: 12 },
        { tile: TileEnums.WHEAT, number: 9 },
        { tile: TileEnums.BRICK, number: 4 },
        { tile: TileEnums.ORE, number: 6 },
        { tile: TileEnums.BRICK, number: 5 },
        { tile: TileEnums.WOOL, number: 10 },
        { tile: TileEnums.DESERT, number: false },
        { tile: TileEnums.WOOD, number: 3 },
        { tile: TileEnums.WHEAT, number: 11 },
        { tile: TileEnums.WOOD, number: 4 },
        { tile: TileEnums.WHEAT, number: 8 },
        { tile: TileEnums.BRICK, number: 8 },
        { tile: TileEnums.WOOL, number: 10 },
        { tile: TileEnums.WOOL, number: 9 },
        { tile: TileEnums.ORE, number: 3 },
        { tile: TileEnums.ORE, number: 5 },
        { tile: TileEnums.WHEAT, number: 2 },
        { tile: TileEnums.WOOD, number: 6 }
    ],
    portData : [
        { resource: TileEnums.DESERT },
        { resource: TileEnums.WOOL },
        { resource: TileEnums.ORE },
        { resource: TileEnums.DESERT },
        { resource: TileEnums.DESERT },
        { resource: TileEnums.WHEAT },
        { resource: TileEnums.BRICK },
        { resource: TileEnums.DESERT },
        { resource: TileEnums.WOOD }
    ]
}