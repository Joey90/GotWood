var TileHexagon = function(length, centreX, centreY, resource, dice, robber) {
	this.hex = new Hexagon(length,
		centreX,
		centreY,
		Config.Graphics.tiles[resource].fill,
		Config.Graphics.strokeStyle,
		Config.Graphics.lineWidth);
	this.resource = resource;
	this.dice = dice;
	this.robber = robber;
}

TileHexagon.prototype.draw = function(ctx) {
	this.hex.draw(ctx);
	
	if(this.resource != TileEnums.DESERT) {
        this.drawDiceNumber(ctx);
	}
}

TileHexagon.prototype.drawDiceNumber = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.hex.centreX,
        this.hex.centreY,
        Config.Graphics.diceNumCircleRadius,
        0,
        2 * Math.PI,
        false);

    // Draw the circle
    ctx.fillStyle = Config.Graphics.diceNumCircleFill;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = Config.Graphics.lineWidth;
    ctx.fill();
    ctx.stroke();

    // Add the text
    ctx.font = Config.Graphics.diceNumFont;
    ctx.fillStyle = Config.Graphics.diceNumFontFill;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.dice, this.hex.centreX, this.hex.centreY);
}

TileHexagon.prototype.isWithin = function(x,y) {
	return this.hex.isWithin(x,y);
}
