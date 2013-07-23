var HillHexagon = function(length, centreX, centreY, dice) {
    TileHexagon.call(this,
        length,
        centreX,
        centreY,
        TileEnums.BRICK,
        dice);
};

HillHexagon.prototype = new TileHexagon;
HillHexagon.constructor = HillHexagon;

HillHexagon.prototype.draw = function(ctx) {
    this.drawFill(ctx);
    this.drawArt(ctx);
    this.drawDiceNumber(ctx);
    this.drawDiceDots(ctx);
    this.drawStroke(ctx);
};

HillHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.hillStripeCount; i++)
    {
        this.drawHillStripe(ctx);
    }
    ctx.restore();
};

HillHexagon.prototype.drawHillStripe = function(ctx) {
    var colour = "rgba("+Math.floor(Math.random()*150+50).toString()+", 20, 0, "+Config.Graphics.hillStripeAlpha+")";
    var pos = Math.floor(Math.random()*Config.Graphics.length*2-Config.Graphics.length);
    var height = Math.floor(Math.random()*Config.Graphics.hillStripeWidthRange+Config.Graphics.hillStripeMinWidth);
    ctx.beginPath();
    ctx.rect(this.centreX - Config.Graphics.length*2, pos + this.centreY, Config.Graphics.length*4, height);
    ctx.fillStyle = colour;
    ctx.fill();
};