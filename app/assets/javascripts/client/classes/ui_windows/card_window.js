var CardWindow = function() {
    CollapsableWindow.call(this,
        400,
        80,
        5,
        true,
        'Cards',
        WindowTabLocationEnum.TOP_LEFT,
        false);
};

CardWindow.prototype = new CollapsableWindow;
CardWindow.constructor = CardWindow;

CardWindow.prototype.drawContent = function(ctx) {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';

    this.drawCard(ctx, 5, TileEnums.WOOD, Game.playerData.wood);
    this.drawCard(ctx, 10  + Config.Graphics.cardWidth, TileEnums.BRICK, Game.playerData.brick);
    this.drawCard(ctx, 15  + 2 * Config.Graphics.cardWidth, TileEnums.WHEAT, Game.playerData.wheat);
    this.drawCard(ctx, 20  + 3 * Config.Graphics.cardWidth, TileEnums.WOOL, Game.playerData.wool);
    this.drawCard(ctx, 25  + 4 * Config.Graphics.cardWidth, TileEnums.ORE, Game.playerData.ore);

    var playerHasDevCards = false; // Wait for development card support qq

    if (playerHasDevCards) {
        this.drawSeparator(ctx, 30  + 5*Config.Graphics.cardWidth);
        // Draw dev cards
    }
};

CardWindow.prototype.drawCard = function(ctx, x, resource, number) {
    ctx.beginPath();
    roundedRect(ctx, x, 5, Config.Graphics.cardWidth, Config.Graphics.cardHeight, 3);
    ctx.fillStyle = Config.Graphics.tiles[resource].paleFill;
    ctx.fill();
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.font = Config.Graphics.cardFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillText(Config.Resources[resource].name, x + Config.Graphics.cardWidth/2, 10);
    ctx.font = Config.Graphics.diceNumFont;
    ctx.fillText(number, x + Config.Graphics.cardWidth/2, 30);
};

CardWindow.prototype.drawSeparator = function(ctx, x) {
    ctx.beginPath();
    ctx.moveTo(x, 2);
    ctx.lineTo(x, this.height - 2 - 2* this.padding);
    ctx.lineWidth = Config.Graphics.separatorWidth;
    ctx.strokeStyle = Config.Graphics.separatorStrokeStyle;
    ctx.stroke();
};