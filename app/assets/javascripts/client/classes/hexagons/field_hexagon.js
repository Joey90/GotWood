var FieldHexagon = function(length, centreX, centreY, dice) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.WHEAT,
        dice);
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.WHEAT;
    this.dice = dice;
};

FieldHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);
    this.tilehex.hex.drawStroke(ctx);
};

FieldHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
};

FieldHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.fieldStripeCount; i++)
    {
        this.drawFieldStripe(ctx);
    }
    ctx.restore();
};

FieldHexagon.prototype.drawFieldStripe = function(ctx) {
    var colour = "rgba(200, 200, "+Math.floor(Math.random()*80).toString()+", "+Config.Graphics.fieldStripeAlpha+")";
    var pos = Math.floor(Math.random()*Config.Graphics.length*2-Config.Graphics.length);
    var height = Math.floor(Math.random()*Config.Graphics.fieldStripeWidthRange+Config.Graphics.fieldStripeMinWidth);
    ctx.save();
    ctx.translate(this.centreX, this.centreY);
    ctx.rotate(Math.floor(Math.random()*2+1)*Math.PI/6 + Math.PI/4);
    ctx.beginPath();
    ctx.rect(-Config.Graphics.length*2, pos, Config.Graphics.length*4, height);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.restore();
};