var PastureHexagon = function(length, centreX, centreY, dice) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.WOOL,
        dice);
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.WOOL;
    this.dice = dice;
};

PastureHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);
    this.tilehex.drawDiceDots(ctx);
    this.tilehex.hex.drawStroke(ctx);
};

PastureHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
};

PastureHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.pastureCircleCount; i++)
    {
        this.drawPastureArc(ctx);
    }
    ctx.restore();
};

PastureHexagon.prototype.drawPastureArc = function(ctx) {
    var colour = "rgba(20, "+Math.floor(Math.random()*200+50).toString()+", 0, "+Config.Graphics.pastureCircleAlpha+")";
    var xpos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var ypos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var radius = Math.floor(Math.random()*Config.Graphics.pastureCircleSizeRange+Config.Graphics.pastureCircleMinSize);
    var strokewidth = Math.floor(Math.random()*Config.Graphics.pastureCircleWidthRange+Config.Graphics.pastureCircleMinWidth);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = strokewidth;
    ctx.strokeStyle = colour;
    ctx.stroke();
};