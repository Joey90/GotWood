var TileHexagon = function(length, centreX, centreY, resource, dice) {
    this.hex = new Hexagon(length,
        centreX,
        centreY,
        Config.Graphics.tiles[resource].fill,
        Config.Graphics.strokeStyle,
        Config.Graphics.lineWidth);
    this.resource = resource;
    this.dice = dice;
};

TileHexagon.prototype.draw = function(ctx) {
    this.hex.draw(ctx);

    if(this.resource != TileEnums.DESERT) {
        this.drawDiceNumber(ctx);
        this.drawDiceDots(ctx);
    }
};

TileHexagon.prototype.drawDiceNumber = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.hex.centreX,
        this.hex.centreY,
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
    ctx.arc(this.hex.centreX,
        this.hex.centreY,
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
    ctx.fillText(this.dice, this.hex.centreX, this.hex.centreY);
};

TileHexagon.prototype.drawDiceDots = function(ctx) {
    dotCount = DiceDots[this.dice];
    for (var i = 0; i < dotCount; i++) {
        ctx.beginPath();
        ctx.arc(this.hex.centreX - Config.Graphics.diceDotRadius*2*(dotCount - 1 - 2*i),
                this.hex.centreY + Config.Graphics.diceNumCircleRadius/2,
                Config.Graphics.diceDotRadius,
                0,
                2 * Math.PI,
                false);
        ctx.fillStyle = Config.Graphics.diceDotFill;
        ctx.fill();
    }
};

TileHexagon.prototype.isWithin = function(x,y) {
    return this.hex.isWithin(x,y);
};
