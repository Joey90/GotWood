var FieldHexagon = function(length, centreX, centreY, dice, robber) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.WHEAT,
        dice,
        robber)
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.WHEAT;
    this.dice = dice;
    this.robber = robber;
}

FieldHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.draw(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);

    if(this.robber) {
        this.tilehex.drawRobber(ctx);
    }
}

FieldHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
}

FieldHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<10; i++)
    {
        this.drawFieldCircle(ctx);
    }
    ctx.restore();
}

FieldHexagon.prototype.drawFieldCircle = function(ctx) {
    var colour = "rgba(156, 156, "+Math.floor(Math.random()*156).toString()+", 0.5)";
    var pos = Math.floor(Math.random()*Config.Graphics.length*2-Config.Graphics.length);
    var height = Math.floor(Math.random()*50+10);
    ctx.save()
    ctx.translate(this.centreX, this.centreY);
    ctx.rotate(Math.floor(Math.random()*2+1)*Math.PI/6 + Math.PI/4);
    ctx.beginPath();
    ctx.rect(-Config.Graphics.length*2, pos, Config.Graphics.length*4, height);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.restore();
}