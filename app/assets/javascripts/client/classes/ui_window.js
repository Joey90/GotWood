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
    this.highlighted = false;
    this.tabPos = null;
    this.tabSize = null;

    this.fillStyle = Config.Graphics.uiWindowFill;
    this.fillStyleLite = Config.Graphics.uiWindowFillLite;
};

UiWindow.prototype.draw = function(ctx) {
    if(this.visible) {
        this.beforeDraw();

        if(this.showTab) this.drawTab(ctx);

        this.drawOuterFrame(ctx);
        this.drawInnerFrame(ctx);

        // Set the clipping region for the actual content and draw it
        ctx.save();
        roundedRect(ctx,
            this.x + this.padding,
            this.y + this.padding,
            this.width,
            this.height,
            Config.Graphics.uiWindowBorderRadius
        );
        ctx.clip();
        ctx.translate(this.x + 2*this.padding, this.y + 2*this.padding);
        this.drawContent(ctx);

        ctx.restore();
    }
};

UiWindow.prototype.drawOuterFrame = function(ctx) {
    ctx.fillStyle = this.fillStyleLite;
    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    roundedRect(ctx,
        this.x,
        this.y,
        this.width + 2*this.padding,
        this.height + 2*this.padding,
        Config.Graphics.uiWindowBorderRadius
    );
    ctx.fill();
    ctx.stroke();
};

UiWindow.prototype.drawInnerFrame = function(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    roundedRect(ctx,
        this.x + this.padding,
        this.y + this.padding,
        this.width,
        this.height,
        Config.Graphics.uiWindowBorderRadius
    );
    ctx.fill();
    ctx.stroke();
};

UiWindow.prototype.beforeDraw = function () { }; //Before Draw Callback

UiWindow.prototype.drawContent = function(ctx) { }; //Intended to be overriden

UiWindow.prototype.drawTab = function(ctx) {
    this.tabSize = this.tabMetrics(ctx);
    this.tabPos = this.tabLocation(this.tabSize);
    
    var rectMods = this.tabRectModifiers();
    
    // Setup the clipping region
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.tabPos.x + rectMods.clip.x,
        this.tabPos.y + rectMods.clip.y,
        this.tabSize.width + rectMods.clip.w,
        this.tabSize.height + rectMods.clip.h);
    ctx.clip();
    
    // Draw the tab background
    ctx.fillStyle = (this.highlighted) ? Config.Graphics.uiWindowTabHighlightFill : Config.Graphics.uiWindowFill;
    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    roundedRect(ctx,
        this.tabPos.x + rectMods.bg.x,
        this.tabPos.y + rectMods.bg.y,
        this.tabSize.width + rectMods.bg.w,
        this.tabSize.height + rectMods.bg.h,
        Config.Graphics.uiWindowBorderRadius
    );
    ctx.fill();
    ctx.stroke();

    // Draw the text
    ctx.translate(this.tabPos.x, this.tabPos.y);
    
    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    if(this.tabPosition == WindowTabLocationEnum.LEFT_TOP || this.tabPosition == WindowTabLocationEnum.LEFT_BOTTOM) {
        ctx.rotate(-Math.PI/2);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.translate(-2*this.padding, 0);
    } else if(this.tabPosition == WindowTabLocationEnum.RIGHT_TOP || this.tabPosition == WindowTabLocationEnum.RIGHT_BOTTOM) {
        ctx.rotate(Math.PI/2);
        ctx.translate(0, -2*this.padding);
        ctx.textBaseline = 'bottom';
    }
    ctx.fillText(this.tabTitle, this.padding, this.padding);
    
    ctx.restore();
};

UiWindow.prototype.windowMetrics = function() {
    return {width: this.width + 2*this.padding, height: this.height + 2*this.padding};  
};

UiWindow.prototype.tabRectModifiers = function() {
    switch(this.tabPosition) {
        case WindowTabLocationEnum.TOP_LEFT:
        case WindowTabLocationEnum.TOP_RIGHT:
            return { clip: {x: -1, y: -1, w: 2, h:1},
                     bg  : {x:  0, y:  0, w: 0, h: this.padding} };
        case WindowTabLocationEnum.BOTTOM_LEFT:
        case WindowTabLocationEnum.BOTTOM_RIGHT:
            return { clip: {x: -1, y: 1, w: 2, h:1},
                     bg  : {x:  0, y:  -this.padding, w: 0, h: this.padding} };
        case WindowTabLocationEnum.LEFT_TOP:
        case WindowTabLocationEnum.LEFT_BOTTOM:
            return { clip: {x:  -1, y: -1, w: 1, h:2},
                     bg  : {x:  0, y: 0, w: this.padding, h:0} };
        case WindowTabLocationEnum.RIGHT_TOP:
        case WindowTabLocationEnum.RIGHT_BOTTOM:
            return { clip: {x:  -1, y: -1, w: 1, h:2},
                     bg  : {x:  -this.padding, y: 0, w: this.padding, h:0} };
        
    }
};

UiWindow.prototype.tabLocation = function(size) {
    switch(this.tabPosition) {
        case WindowTabLocationEnum.TOP_LEFT:
            return {x: this.x + this.padding, y: this.y - size.height};
        case WindowTabLocationEnum.TOP_RIGHT:
            return {x: this.x + this.padding + this.width - size.width, y: this.y - size.height};
        case WindowTabLocationEnum.BOTTOM_LEFT:
            return {x: this.x + this.padding, y: this.y + 2 * this.padding + this.height};
        case WindowTabLocationEnum.BOTTOM_RIGHT:
            return {x: this.x + this.padding + this.width - size.width,
                    y: this.y + 2 * this.padding + this.height};
        case WindowTabLocationEnum.LEFT_TOP:
            return {x: this.x - size.width, y: this.y + this.padding};
        case WindowTabLocationEnum.LEFT_BOTTOM:
            return {x: this.x - size.width, y: this.y + this.padding + this.height - size.height};
        case WindowTabLocationEnum.RIGHT_TOP:
            return {x: this.x + 2*this.padding + this.width, y: this.y + this.padding};
        case WindowTabLocationEnum.RIGHT_BOTTOM:
            return {x: this.x + 2*this.padding + this.width,
                    y: this.y + this.padding + this.height - size.height};
        default:
            return {x:0, y:0};
    }
};

UiWindow.prototype.tabMetrics = function(ctx) {
    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    var metrics = ctx.measureText(this.tabTitle);

    var height = Config.Graphics.uiWindowFontSize + 2*this.padding;
    var width  = metrics.width + 2*this.padding;
    
    switch(this.tabPosition) {
        case WindowTabLocationEnum.TOP_LEFT:
        case WindowTabLocationEnum.TOP_RIGHT:
        case WindowTabLocationEnum.BOTTOM_LEFT:
        case WindowTabLocationEnum.BOTTOM_RIGHT:
            return {width: width, height: height};
        case WindowTabLocationEnum.LEFT_TOP:
        case WindowTabLocationEnum.LEFT_BOTTOM:
        case WindowTabLocationEnum.RIGHT_TOP:
        case WindowTabLocationEnum.RIGHT_BOTTOM:
            return {width: height, height: width};
    }
};

UiWindow.prototype.isWithin = function(x,y) {
    var relX = x - this.x;
    var relY = y - this.y;
    
    var metrics = this.windowMetrics();
    
    return (this.visible && relX >= 0 && relX <= metrics.width && relY >= 0 && relY <= metrics.height);
};

UiWindow.prototype.isWithinTab = function(x,y) {
    if(this.tabPos) {
        var xRelTab = x - this.tabPos.x;
        var yRelTab = y - this.tabPos.y;
    
        return (xRelTab >= 0 && xRelTab <= this.tabSize.width && yRelTab >= 0 && yRelTab <= this.tabSize.height);
    } else
        return false;
};

UiWindow.prototype.click = function(mouse) {
    
};