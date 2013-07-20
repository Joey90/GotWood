var Hexagon = function(length, centreX, centreY, fill, stroke, width ) {
	this.length   = length;
	this.centreX  = centreX;
	this.centreY  = centreY;
	this.fill	  = fill;    // Canvas FillStyle
	this.stroke	  = stroke;  // Canvas StrokeStyle
	this.width    = width;   // Canvas LineWidth
};

Hexagon.prototype.drawPath = function(ctx) {
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
};

Hexagon.prototype.draw = function(ctx) {
    this.drawFill(ctx);
    this.drawStroke(ctx);
};

Hexagon.prototype.drawFill = function(ctx) {
    this.drawPath(ctx);
    ctx.fillStyle = this.fill;
    ctx.fill();
};

Hexagon.prototype.drawStroke = function(ctx) {
    this.drawPath(ctx);
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.stroke;
    ctx.stroke();
};

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
};
