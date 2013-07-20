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
	
	// Draw the robber on top of the dice number
	if(this.robber)
		this.drawRobber(ctx);
}

TileHexagon.prototype.isWithin = function(x,y) {
	return this.hex.isWithin(x,y);
}

TileHexagon.prototype.drawRobber = function(ctx) {
	ctx.save();
	ctx.translate(this.hex.centreX, this.hex.centreY);
	
	// We need to compute the angle removed from the arc.
	// Thankfully we know the cosine law:
	var h = 30; // Robber body height
	var w = 15; // Robber body width
	var r = 10;  // Robber head radius
		
	var theta = Math.acos(1 - Math.pow(w,2)/(2*Math.pow(r,2)));
	var phi   = (Math.PI - theta)/2;
	
	// Draw the robber's shadow
	drawShadow(ctx, 0, h/2, 15, 5);
	
	// Construct the robber path
	ctx.beginPath();
	ctx.moveTo(w/2, -h/2);
	ctx.arc(0, -h/2 - r * Math.cos(theta/2), r, phi, theta + phi, true);
	ctx.quadraticCurveTo(-w, h/3, -w/2, h/2);
	ctx.quadraticCurveTo(0, 2*h/3, w/2, h/2);
	ctx.quadraticCurveTo(w, h/3, w/2, -h/2);
	
	// Construct the radial gradient
	var grad = ctx.createRadialGradient(0, -h/2 - 1.5 * r * Math.cos(theta/2), 3, 0, -h/2 - 1.5 * r * Math.cos(theta/2), 2*w);
	grad.addColorStop(0, 'Grey');
	grad.addColorStop(1, 'DarkSlateGrey');
	
	ctx.fillStyle = grad;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.stroke();
	ctx.fill();
	
	ctx.restore();
}
