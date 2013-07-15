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
        xOffsets: [0,0,0,1,1,1,1,2,2,2,2,2,1,1,1,1,0,0,0],
        yOffsets: [0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,4],
        spaces  : [0,1,2,0,1,2,3,0,1,2,3,4,0,1,2,3,0,1,2],
        startX  : 313,
        startY  : 155,
        length  : 80,
        tiles   : [],
        oceanFill  : 'RoyalBlue',
        strokeStyle: 'rgb(0,0,0)',
        lineWidth  : 1,
        font       : '20px Denk One',
        fontColor  : 'Black',
        textAlign  : 'center'
    }
}

Config.Graphics.tiles[TileEnums.DESERT] = { fill: 'LightGoldenrodYellow', label: 'DESERT' };
Config.Graphics.tiles[TileEnums.WOOD]   = { fill: 'DarkGreen', label: 'FOREST' };
Config.Graphics.tiles[TileEnums.BRICK]  = { fill: 'FireBrick', label: 'HILL' };
Config.Graphics.tiles[TileEnums.WHEAT]  = { fill: 'Wheat', label: 'FIELD' };
Config.Graphics.tiles[TileEnums.WOOL]   = { fill: 'PaleGreen', label: 'PASTURE' };
Config.Graphics.tiles[TileEnums.ORE]    = { fill: 'Silver', label: 'MOUNTAIN' };


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
    ]
}