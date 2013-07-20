var ForestHexagon = function(length, centreX, centreY, dice, robber) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.WOOD,
        dice,
        robber)
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.WOOD;
    this.dice = dice;
    this.robber = robber;
}

ForestHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);
    this.tilehex.hex.drawStroke(ctx);
}

ForestHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
}

ForestHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.forestCircleCount; i++)
    {
        this.drawForestCircle(ctx);
    }
    ctx.restore();
}

ForestHexagon.prototype.drawForestCircle = function(ctx) {
    var colour = "rgba(0, "+Math.floor(Math.random()*256).toString()+", 0, "+Config.Graphics.forestCircleAlpha+")";
    var xpos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var ypos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var radius = Math.floor(Math.random()*Config.Graphics.forestCircleSizeRange+Config.Graphics.forestCircleMinSize);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
}
