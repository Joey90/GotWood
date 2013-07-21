var DesertHexagon = function(length, centreX, centreY) {
    this.tilehex = new TileHexagon(length,
        centreX,
        centreY,
        TileEnums.DESERT,
        0);
    this.centreX  = centreX;
    this.centreY  = centreY;
    this.resource = TileEnums.DESERT;
};

DesertHexagon.prototype.draw = function(ctx) {
    this.tilehex.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.tilehex.hex.drawStroke(ctx);
};

DesertHexagon.prototype.isWithin = function(x,y) {
    return this.tilehex.hex.isWithin(x,y);
};

DesertHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.tilehex.hex.drawPath(ctx);
    ctx.clip();
    for (var i=0; i<Config.Graphics.desertWaveCount; i++)
    {
        this.drawWave(ctx);
    }
    ctx.restore();
};

DesertHexagon.prototype.drawWave = function(ctx) {
    var colour = "rgba(200, 156, "+Math.floor(Math.random()*156).toString()+", "+Config.Graphics.desertWaveAlpha+")";
    var pos = this.centreY+Math.floor(Math.random()*Config.Graphics.length*2-Config.Graphics.length);
    var width = Math.floor(Math.random()*Config.Graphics.desertWaveWidthRange+Config.Graphics.desertWaveMinWidth);
    var offset = this.centreX-(Math.floor(Math.random()*Config.Graphics.desertWaveLength*2)+Config.Graphics.length);
    ctx.beginPath();
    ctx.moveTo(offset, pos);
    for (var i = 0; i < Math.ceil((3*Config.Graphics.length)/Config.Graphics.desertWaveLength); i++) {
        ctx.bezierCurveTo(offset + (i + .15)*Config.Graphics.desertWaveLength, pos + Config.Graphics.desertWaveLength/4,
            offset + (i + .35)*Config.Graphics.desertWaveLength, pos + Config.Graphics.desertWaveLength/4,
            offset + (i + .5 )*Config.Graphics.desertWaveLength, pos);
        ctx.bezierCurveTo(offset + (i + .65)*Config.Graphics.desertWaveLength, pos - Config.Graphics.desertWaveLength/4,
            offset + (i + .85)*Config.Graphics.desertWaveLength, pos - Config.Graphics.desertWaveLength/4,
            offset + (i + 1  )*Config.Graphics.desertWaveLength, pos);
    }
    ctx.lineWidth = width;
    ctx.strokeStyle = colour;
    ctx.stroke();
};