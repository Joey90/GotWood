var UiLabel = function(x, y, text, fSize, fFamily, fFill) {
	UiElement.call(this, x, y, 0, 0);
	this.height = fSize;
	this.text = text;
	this.font = fSize.toString() + 'px ' + fFamily;
	this.fill = fFill;
}

UiLabel.prototype = new UiElement;
UiLabel.constructor = UiLabel;

UiLabel.prototype.beforeDraw = function(ctx) {
	ctx.font = this.font;
	ctx.fillStyle = this.fill;
	this.width = ctx.measureText(this.text).width;
}

UiLabel.prototype.draw = function(ctx) {
	ctx.font = this.font;
	ctx.fillStyle = this.fill;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText(this.text, 0, 0);
};
