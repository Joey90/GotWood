var SeaHexagon = function() {
	this.hex = new Hexagon(450, 0, 0, TileEnums.SEA);
}

SeaHexagon.prototype.draw = function(ctx) {
	ctx.save();

	ctx.translate(Config.Graphics.startX, Config.Graphics.startY);
    ctx.rotate(Math.PI/6);
    
    this.hex.draw(ctx);
    
    ctx.restore();
}

SeaHexagon.prototype.isWithin = function(x,y) { return false; }
