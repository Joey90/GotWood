var TileHexagon = function(length, centreX, centreY, resource, dice) {
    Hexagon.call(this,
        length,
        centreX,
        centreY,
        (typeof resource === "undefined")  ? undefined : Config.Graphics.tiles[resource].fill,
        Config.Graphics.strokeStyle,
        Config.Graphics.lineWidth);
    this.resource = resource;
    this.dice = dice;
};

TileHexagon.prototype = new Hexagon;
TileHexagon.constructor = TileHexagon;

TileHexagon.prototype.draw = function(ctx) {
    Hexagon.draw.call(this, ctx);

    if(this.resource != TileEnums.DESERT) {
        this.drawDiceNumber(ctx);
        this.drawDiceDots(ctx);
    }
};

TileHexagon.prototype.drawDiceNumber = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.centreX,
        this.centreY,
        Config.Graphics.diceNumCircleRadius,
        0,
        2 * Math.PI,
        false);

    ctx.fillStyle = Config.Graphics.diceNumCircleFill;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = Config.Graphics.lineWidth;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.centreX,
        this.centreY,
        Config.Graphics.diceNumCircleRadius2,
        0,
        2 * Math.PI,
        false);
    ctx.fillStyle = Config.Graphics.diceNumCircleFill2;
    ctx.fill();

    // Add the text
    ctx.font = Config.Graphics.diceNumFont;
    ctx.fillStyle = Config.Graphics.diceNumFontFill;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.dice, this.centreX, this.centreY);
};

TileHexagon.prototype.drawDiceDots = function(ctx) {
    dotCount = DiceDots[this.dice];
    for (var i = 0; i < dotCount; i++) {
        ctx.beginPath();
        ctx.arc(this.centreX - Config.Graphics.diceDotRadius*2*(dotCount - 1 - 2*i),
                this.centreY + Config.Graphics.diceNumCircleRadius/2,
                Config.Graphics.diceDotRadius,
                0,
                2 * Math.PI,
                false);
        ctx.fillStyle = Config.Graphics.diceDotFill;
        ctx.fill();
    }
};
