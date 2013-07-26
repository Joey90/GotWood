// The button will automagically calculate its width and height
// during the pre-draw stage unless w and h are explicitly specified.
// fSize is assumed to be in pixels.
var UiButton = function(x , y , padding, text, fSize, fFamily, fFill, w, h) {
	if( w !== undefined && h !== undefined ) {
		UiElement.call(this, x, y, w, h);
		this.autoSize = false;
	} else {
		UiElement.call(this, x, y, 0, 0);
		this.autoSize = true;
	}
	this.padding = padding;
	this.text = text;
	this.fontSize = fSize;
	this.fontFamily = fFamily;
	this.fillStyle = fFill;
	
	this.font = this.fontSize.toString() + 'px ' + this.fontFamily;
};

UiButton.prototype = new UiElement;
UiButton.constructor = UiButton;

UiButton.prototype.beforeDraw = function(ctx) {
	if(this.autoSize) {
		ctx.font = this.font;
		ctx.fillStyle = this.fillStyle;
		var metrics = ctx.measureText(this.text);
		
		this.width = metrics.width + 2*this.padding;
		this.height = this.fontSize + 2*this.padding;
	}
};

UiButton.prototype.draw = function(ctx) {	
	ctx.beginPath();
	roundedRect(ctx, 0, 0, this.width, this.height, Config.Graphics.uiWindowBorderRadius);
	ctx.fillStyle = (this.highlighted) ? 'Goldenrod' : Config.Graphics.controlButtonFill;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
	ctx.fill();
	ctx.stroke();
	
	ctx.font = this.font;
	ctx.fillStyle = this.fillStyle;
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillText(this.text, this.width/2, this.height/2);
};

UiButton.prototype.mouseOver = function(mouse) {
	this.highlighted = true;
};

UiButton.prototype.mouseOut = function(mouse) {
	this.highlighted = false;
};

UiButton.prototype.click = function(mouse) {

};
