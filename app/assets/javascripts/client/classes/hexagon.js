var Hexagon = function(length, centreX, centreY, fill, stroke, width ) {
	this.length   = length;
	this.centreX  = centreX;
	this.centreY  = centreY;
	this.fill	  = fill;    // Canvas FillStyle
	this.stroke	  = stroke;  // Canvas StrokeStyle
	this.width    = width;   // Canvas LineWidth
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
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.stroke;
    ctx.fillStyle = this.fill;
    ctx.stroke();
    ctx.fill();

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
