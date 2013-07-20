var UiWindow = function(x, y, width, height, padding, visible, showTab, tabTitle, tabPosition) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.padding = padding;
	this.visible = visible;
	this.showTab = showTab;
	this.tabTitle = tabTitle;
	this.tabPosition = tabPosition;
}

UiWindow.prototype.draw = function(ctx) {
	if(this.visible) {
	    
	    if(this.showTab)
	       this.drawTab(ctx);
	    
	    // Draw outer frame
		ctx.fillStyle = Config.Graphics.uiWindowFillLite;
        ctx.strokeStyle = Config.Graphics.uiWindowStroke;
        ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
		roundedRect(ctx,
		    this.x - this.padding,
		    this.y - this.padding,
		    this.width + 2*this.padding,
		    this.height + 2*this.padding,
		    Config.Graphics.uiWindowBorderRadius
		);
		ctx.fill();
		ctx.stroke();
		
		// Draw the inner frame	
		ctx.fillStyle = Config.Graphics.uiWindowFill;
		ctx.strokeStyle = Config.Graphics.uiWindowStroke;
        ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
		roundedRect(ctx,
		    this.x,
		    this.y,
		    this.width,
		    this.height,
		    Config.Graphics.uiWindowBorderRadius
		);
		ctx.fill();
	    ctx.stroke();
	    
	    // Set the clipping region for the actual content and draw it
		ctx.save();
		roundedRect(ctx, this.x, this.y, this.width, this.height, 5);
		ctx.clip();
		ctx.translate(this.x + 5, this.y + 5);
		this.drawContent(ctx);
		
		ctx.restore();
	}
}

UiWindow.prototype.drawContent = function(ctx) {
	
}

UiWindow.prototype.drawTab = function(ctx) {
    var radius = Config.Graphics.uiWindowBorderRadius;
    
    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    var metrics = ctx.measureText(this.tabTitle);

    var height = -(Config.Graphics.uiWindowFontSize + 2*this.padding);
    var width  = metrics.width + 2*this.padding;

    ctx.save();
    switch(this.tabPosition) {
        case WindowTabLocationEnum.TOP_LEFT:
            ctx.translate(this.x, this.y - this.padding);
            break;
        case WindowTabLocationEnum.TOP_RIGHT:
            ctx.translate(this.x + this.width - width, this.y - this.padding);
            break;
        case WindowTabLocationEnum.LEFT_TOP:
            ctx.translate(this.x - this.padding, this.y + width);
            ctx.rotate(-Math.PI/2);
            break;
        case WindowTabLocationEnum.RIGHT_TOP:
            ctx.translate(this.x + this.width + this.padding, this.y );
            ctx.rotate(Math.PI/2);
            break;
        case WindowTabLocationEnum.LEFT_BOTTOM:
            ctx.translate(this.x - this.padding, this.y + this.height);
            ctx.rotate(-Math.PI/2);
            break;
        case WindowTabLocationEnum.RIGHT_BOTTOM:
            ctx.translate(this.x + this.width + this.padding, this.y + this.height - width);
            ctx.rotate(Math.PI/2);
            break;
        case WindowTabLocationEnum.BOTTOM_LEFT:
            ctx.translate(this.x + width, this.y + this.padding + this.height);
            ctx.rotate(Math.PI);
            break;
        case WindowTabLocationEnum.BOTTOM_RIGHT:
            ctx.translate(this.x + this.width, this.y + 5 + this.height);
            ctx.rotate(Math.PI);
            break;
    }
    
    // Draw the outline
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height + radius);
    ctx.quadraticCurveTo(0, height, radius, height);
    ctx.lineTo(width - radius, height);
    ctx.quadraticCurveTo(width, height, width, height + radius);
    ctx.lineTo(width, 0);
    
    // Fill and stroke the outline
    ctx.fillStyle = 'rgba(250, 250, 250, 0.8)';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    
    
    // Write the text
    ctx.fillStyle = 'Black';
    
    if(
        this.tabPosition == WindowTabLocationEnum.BOTTOM_LEFT
     || this.tabPosition == WindowTabLocationEnum.BOTTOM_RIGHT )
     {
         ctx.save();
         ctx.rotate(Math.PI);
         ctx.translate(-width, -height);
         ctx.fillText(this.tabTitle, this.padding, -this.padding);
         ctx.restore();
     } else {
        ctx.fillText(this.tabTitle, this.padding, -this.padding);
     }
    
    ctx.restore();
}

UiWindow.prototype.isWithin = function(x,y) {
    var mainBox = (this.x - x <= this.width && this.y - y <= this.height);
    return mainBox;
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
}