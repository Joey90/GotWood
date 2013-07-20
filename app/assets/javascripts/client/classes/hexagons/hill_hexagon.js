var HillHexagon = function(length, centreX, centreY, dice, robber) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.BRICK,
        dice,
        robber)
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.BRICK;
    this.dice = dice;
    this.robber = robber;
}

HillHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);
    this.tilehex.hex.drawStroke(ctx);
}

HillHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
}

HillHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<10; i++)
    {
        this.drawHillStripe(ctx);
    }
    ctx.restore();
}

HillHexagon.prototype.drawHillStripe = function(ctx) {
    var colour = "rgba("+Math.floor(Math.random()*256).toString()+",0 , 0, 0.5)";
    var pos = Math.floor(Math.random()*Config.Graphics.length*2-Config.Graphics.length);
    var height = Math.floor(Math.random()*50+10);
    ctx.beginPath();
    ctx.rect(this.centreX - Config.Graphics.length*2, pos + this.centreY, Config.Graphics.length*4, height);
    ctx.fillStyle = colour;
    ctx.fill();
}