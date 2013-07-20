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
    this.tilehex.hex.draw(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);

    if(this.robber) {
        this.tilehex.drawRobber(ctx);
    }
}

ForestHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
}

ForestHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<15; i++)
    {
        this.drawForestCircle(ctx);
    }
    ctx.restore();
}

ForestHexagon.prototype.drawForestCircle = function(ctx) {
    var colour = "rgba(0, "+Math.floor(Math.random()*256).toString()+", 0, 0.5)";
    var xpos = Math.floor(Math.random()*200-100);
    var ypos = Math.floor(Math.random()*200-100);
    var radius = Math.floor(Math.random()*35+20);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
}
