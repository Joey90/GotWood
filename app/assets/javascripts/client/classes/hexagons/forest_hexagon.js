var ForestHexagon = function(length, centreX, centreY, dice) {
    TileHexagon.call(this,
        length,
        centreX,
        centreY,
        TileEnums.WOOD,
        dice);
};

ForestHexagon.prototype = new TileHexagon;
ForestHexagon.constructor = ForestHexagon;

ForestHexagon.prototype.draw = function(ctx) {
    this.drawFill(ctx);
    this.drawArt(ctx);
    this.drawDiceNumber(ctx);
    this.drawDiceDots(ctx);
    this.drawStroke(ctx);
};

ForestHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.forestCircleCount; i++)
    {
        this.drawForestCircle(ctx);
    }
    ctx.restore();
};

ForestHexagon.prototype.drawForestCircle = function(ctx) {
    var colour = "rgba(0, "+Math.floor(Math.random()*190+50).toString()+", 0, "+Config.Graphics.forestCircleAlpha+")";
    var xpos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var ypos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var radius = Math.floor(Math.random()*Config.Graphics.forestCircleSizeRange+Config.Graphics.forestCircleMinSize);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
};
