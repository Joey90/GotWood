// UiElements will be clipped to their stated dimensions
// during the draw step, so this information should be accurate.
// It can be calculated during beforeDraw if necessary.
var UiElement = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	
	this.highlighted = false;
};

UiElement.prototype.beforeDraw = function(ctx) { };

// UiElements should assume that the context has automatically been
// translated so that the origin is at the (x,y) specified during construction.
UiElement.prototype.draw = function(ctx) { };

UiElement.prototype.isWithin = function(x, y) {
	var xRel = x - this.x;
	var yRel = y - this.y;
	
	return (xRel >= 0 && xRel <= this.width && yRel >= 0 && yRel <= this.height);
};

UiElement.prototype.mouseOver = function(mouse) {
	
};

UiElement.prototype.mouseOut = function(mouse) {

};

UiElement.prototype.click = function(mouse) {
	
};
