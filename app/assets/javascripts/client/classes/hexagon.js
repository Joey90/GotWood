var Hexagon = function(length, centreX, centreY, resource, dice ) {
	this.length   = length;
	this.centreX  = centreX;
	this.centreY  = centreY;
	this.resource = resource;
	this.dice     = dice;
}

Hexagon.prototype.draw = function(ctx) {
	ctx.beginPath();
    
    // Assuming point-up hexagons
    ctx.moveTo(this.centreX, this.centreY - this.length);
    ctx.lineTo(this.centreX + this.length * Math.cos(Math.PI/6),
    	this.centreY - (this.length / 2));
    ctx.lineTo(this.centreX + this.length * Math.cos(Math.PI/6),
    	this.centreY + (this.length / 2));
    ctx.lineTo(this.centreX, this.centreY + this.length);
    ctx.lineTo(this.centreX - this.length * Math.cos(Math.PI/6),
    	this.centreY + (this.length / 2));
    ctx.lineTo(this.centreX - this.length * Math.cos(Math.PI/6),
    	this.centreY - (this.length / 2));
    	
    ctx.closePath();
    
    // Stroke that hexagon ;)
    ctx.lineWidth = Config.Graphics.lineWidth;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.fillStyle = Config.Graphics.tiles[this.resource].fill;
    ctx.stroke();
    ctx.fill();
    
    if(this.dice == 0)
    	return;
    
    // Draw the dice number circle
    ctx.beginPath();
    ctx.arc(this.centreX, this.centreY, Config.Graphics.diceNumCircleRadius, 0, 2*Math.PI, false);
    ctx.fillStyle = Config.Graphics.diceNumCircleFill;
    ctx.fill();
    ctx.stroke();
    
    ctx.font = Config.Graphics.diceNumFont;
    ctx.fillStyle = Config.Graphics.diceNumFontFill;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.dice, this.centreX, this.centreY);
}

Hexagon.prototype.isWithin = function(x,y) {
	
	// First transform the point to the hexagon's frame.
	// Take abs to map all points into the same quadrant
	// of the hexagon.
	var xHex = Math.abs(x - this.centreX);
	var yHex = Math.abs(y - this.centreY);
	
	var horiz = this.length * Math.sqrt(3)/2;
	var vert  = this.length;
	
	// Check to see if the point is within the bounding box
	if (xHex > horiz || yHex > vert)
		return false;
	else
		return vert * horiz - vert * xHex /2 - horiz * yHex >= 0;
}
