var SeaHexagon = function() {
	this.hex = new Hexagon(Config.Graphics.seaLength,
		0,
		0,
		Config.Graphics.oceanFill,
		Config.Graphics.strokeStyle,
		Config.Graphics.lineWidth
	);
};

SeaHexagon.prototype.draw = function(ctx) {
	ctx.save();

	ctx.translate(Config.Graphics.startX, Config.Graphics.startY);
    ctx.rotate(Math.PI/6);

    this.hex.drawFill(ctx);
    this.drawArt(ctx);
    this.hex.drawStroke(ctx);

    ctx.restore();
};

SeaHexagon.prototype.isWithin = function(x,y) { return false; }

SeaHexagon.prototype.drawArt = function(ctx) {
    ctx.save();
    this.hex.drawPath(ctx);
    ctx.clip();
    ctx.rotate(-Math.PI/6);
    for (var i=0; i<Config.Graphics.seaWaveCount; i++)
    {
        this.drawWave(ctx);
    }
    ctx.restore();
}

SeaHexagon.prototype.drawWave = function(ctx) {
    var colour = "rgba(0, 0, "+Math.floor(Math.random()*156+100).toString()+", "+Config.Graphics.seaWaveAlpha+")";
    var pos = Math.floor(Math.random()*Config.Graphics.seaLength*2-Config.Graphics.seaLength);
    var width = Math.floor(Math.random()*Config.Graphics.seaWaveWidthRange+Config.Graphics.seaWaveMinWidth);
    var offset = -1*(Math.floor(Math.random()*Config.Graphics.seaWaveLength*2)+Config.Graphics.seaLength);
    ctx.beginPath();
    ctx.moveTo(offset, pos);
    for (var i = 0; i < Math.ceil((2*Config.Graphics.seaLength-offset)/Config.Graphics.seaWaveLength); i++) {
        ctx.bezierCurveTo(offset + (i + .15)*Config.Graphics.seaWaveLength, pos + Config.Graphics.seaWaveLength/4,
                          offset + (i + .35)*Config.Graphics.seaWaveLength, pos + Config.Graphics.seaWaveLength/4,
                          offset + (i + .5 )*Config.Graphics.seaWaveLength, pos);
        ctx.bezierCurveTo(offset + (i + .65)*Config.Graphics.seaWaveLength, pos - Config.Graphics.seaWaveLength/4,
                          offset + (i + .85)*Config.Graphics.seaWaveLength, pos - Config.Graphics.seaWaveLength/4,
                          offset + (i + 1  )*Config.Graphics.seaWaveLength, pos);
    }
    ctx.lineWidth = width;
    ctx.strokeStyle = colour;
    ctx.stroke();
};