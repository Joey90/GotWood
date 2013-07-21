var MountainHexagon = function(length, centreX, centreY, dice) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.ORE,
        dice);
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.ORE;
    this.dice = dice;
};

MountainHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.drawDiceNumber(ctx);
    this.tilehex.drawDiceDots(ctx);
    this.tilehex.hex.drawStroke(ctx);
};

MountainHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
};

MountainHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.mountainCircleCount; i++)
    {
        this.drawMountainCircle(ctx);
    }
    ctx.restore();
};

MountainHexagon.prototype.drawMountainCircle = function(ctx) {
    var colour = "rgba(150, 140, "+Math.floor(Math.random()*100+140).toString()+", "+Config.Graphics.mountainCircleAlpha+")";
    var xpos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var ypos = Math.floor(Math.random()*2*Config.Graphics.length-Config.Graphics.length);
    var radius = Math.floor(Math.random()*Config.Graphics.mountainCircleSizeRange+Config.Graphics.mountainCircleMinSize);
    ctx.beginPath();
    ctx.arc(xpos + this.centreX, ypos + this.centreY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
};
