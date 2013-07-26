var UiCard = function(x, y, resource, number) {
	UiElement.call(this,
		x,
		y,
		Config.Graphics.cardWidth + 2,
		Config.Graphics.cardHeight +2
	);
	this.resource = resource;
	this.number = number;
};

UiCard.prototype = new UiElement;
UiCard.constructor = UiCard;

UiCard.prototype.draw = function(ctx) {
	ctx.beginPath();
	roundedRect(ctx, 0, 0, Config.Graphics.cardWidth, Config.Graphics.cardHeight, 3);
	
	ctx.fillStyle = Config.Graphics.tiles[this.resource].paleFill;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.lineWidth = 1;
	ctx.fill();
	ctx.stroke();
	
	ctx.textBaseline = 'top';
	ctx.textAlign = 'center';
	ctx.fillStyle = Config.Graphics.uiWindowFontFill;
	ctx.font = Config.Graphics.cardFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
	ctx.fillText(Config.Resources[this.resource].name, Config.Graphics.cardWidth/2, 5);
	ctx.font = Config.Graphics.diceNumFont;
	ctx.fillText(this.number, Config.Graphics.cardWidth/2, 30);
};
