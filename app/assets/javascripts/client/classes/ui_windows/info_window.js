var InfoWindow = function() {
    UiWindow.call(this,
        10,
        10,
        400,
        24,
        5,
        false,
        true,
        'Tile Info',
        WindowTabLocationEnum.BOTTOM_LEFT
    );
};

// Subclassing UiWindow
InfoWindow.prototype = new UiWindow;
InfoWindow.constructor = InfoWindow;

InfoWindow.prototype.currentTile = -1;

InfoWindow.prototype.drawContent = function(ctx) {
    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    if(this.currentTile >= 0) {
        // Need to subtract 1 to compensate for the sea hexagon.
        var tile = Game.tileData[this.currentTile - 1];
        var text = "";
        if(tile.resource == TileEnums.DESERT) {
            text = "Desert. Produces nothing. ";
        } else {
            text = Config.Graphics.tiles[tile.resource].label + ". Produces "
                    + Config.Resources[tile.resource].name.toLowerCase() + " on a "
                    + tile.dice_number + " (" + DiceProbs[tile.dice_number] + "%). ";
        }

        if(tile.robber && tile.resource != TileEnums.DESERT) {
            text += "The robber is here, blocking resource production.";
        }

        ctx.fillText(text, 0, 0);
    }

};
