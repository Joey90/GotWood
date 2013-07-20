var MountainHexagon = function(length, centreX, centreY, dice, robber) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.ORE,
        dice,
        robber)
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.ORE;
    this.dice = dice;
    this.robber = robber;
}

MountainHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);
    this.tilehex.hex.drawStroke(ctx);
}

MountainHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
}

MountainHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<50; i++)
    {
        this.drawMountainCircle(ctx);
    }
    ctx.restore();
}

MountainHexagon.prototype.drawMountainCircle = function(ctx) {
    var colour = "rgba(156, 156, "+Math.floor(Math.random()*156+100).toString()+", 0.5)";
    var xpos = Math.floor(Math.random()*200-100);
    var ypos = Math.floor(Math.random()*200-100);
    var radius = Math.floor(Math.random()*10+3);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
}