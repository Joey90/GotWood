var PastureHexagon = function(length, centreX, centreY, dice, robber) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.WOOL,
        dice,
        robber)
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.WOOL;
    this.dice = dice;
    this.robber = robber;
}

PastureHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.draw(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);

    if(this.robber) {
        this.tilehex.drawRobber(ctx);
    }
}

PastureHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
}

PastureHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<15; i++)
    {
        this.drawPastureArc(ctx);
    }
    ctx.restore();
}

PastureHexagon.prototype.drawPastureArc = function(ctx) {
    var colour = "rgba(0, "+Math.floor(Math.random()*256).toString()+", 0, 0.5)";
    var xpos = Math.floor(Math.random()*200-100);
    var ypos = Math.floor(Math.random()*200-100);
    var radius = Math.floor(Math.random()*35+20);
    var strokewidth = Math.floor(Math.random()*5+5);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = strokewidth;
    ctx.strokeStyle = colour;
    ctx.stroke();
}