var InfoWindow = function() {
    UiWindow.call(this,
        10,
        10,
        360,
        Config.Graphics.uiWindowFontSize + 10,
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

InfoWindow.prototype.beforeDraw = function() {
    this.fillStyle = Config.Graphics.tiles[Game.tileData[this.currentTile - 1].resource].paleFill;
}

InfoWindow.prototype.drawContent = function(ctx) {

    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    this.drawText(ctx);
};

InfoWindow.prototype.drawText = function(ctx) {
    var tile = Game.tileData[this.currentTile - 1];

    if(this.currentTile >= 0) {
        // Need to subtract 1 to compensate for the sea hexagon.

        var text = "";
        var robberText = "The robber is here, blocking production.";
        this.height = Config.Graphics.uiWindowFontSize + 10;
        if(tile.resource == TileEnums.DESERT) {
            text = "Desert. Produces nothing. ";
        } else {
            text = Config.Graphics.tiles[tile.resource].label + ". Produces "
                + Config.Resources[tile.resource].name.toLowerCase() + " upon rolling "
                + ((tile.dice_number == 8 || tile.dice_number == 11) ? "an " : "a ")
                + tile.dice_number + " (" + DiceProbs[tile.dice_number] + "%). ";
        }

        ctx.fillText(text, 0, 0);

        if(tile.robber && tile.resource != TileEnums.DESERT) {
            this.height = Config.Graphics.uiWindowFontSize*2 + 20;
            ctx.fillText(robberText, 0, 24);
        }
    }
}
