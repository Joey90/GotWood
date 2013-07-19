var UiWindow = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

UiWindow.prototype.draw = function(ctx) {
	ctx.fillStyle = 'rgba(250, 250, 250, 0.4)';
	roundedRect(ctx, this.x, this.y, this.width, this.height, 5 );
	ctx.fill();
	
	ctx.fillStyle = 'rgba(250, 250, 250, 0.8)';
	roundedRect(ctx, this.x + 3, this.y + 3, this.width - 6, this.height - 6, 5);
	ctx.fill();
	
	ctx.save();
	ctx.translate(this.x + 6, this.y + 6);
	this.drawContent(ctx);
	ctx.restore();
}

UiWindow.prototype.drawContent = function(ctx) {
	
}

function roundedRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x, y + r);
	ctx.lineTo(x, y + h - r);
	ctx.quadraticCurveTo(x, y + h, x + r, y + h);
	ctx.lineTo(x + w - r, y + h);
	ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
	ctx.lineTo(x + w, y + r);
	ctx.quadraticCurveTo(x + w, y, x + w - r, y);
	ctx.lineTo(x + r, y);
	ctx.quadraticCurveTo(x,y,x,y+r);
	ctx.stroke();
}
