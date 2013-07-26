var CollapsableWindow = function (w, h, pad, vis, tabTitle, tabPos, expanded) {
    
    // Figure out the positioning based on the tab position
    UiWindow.call(this,
        0,
        0,
        w,
        h,
        pad,
        vis,
        true,
        tabTitle,
        tabPos
    );
    this.baseWidth = w;
    this.baseHeight = h;
    this.expanded = expanded;
};

CollapsableWindow.prototype = new UiWindow;
CollapsableWindow.constructor = CollapsableWindow; 

CollapsableWindow.prototype.location = function() {
    
    var x = 0;
    var y = 0;
    
    var trueWidth = this.baseWidth + 2 * this.padding;
    var trueHeight = this.baseHeight + 2 * this.padding;
    
    switch(this.tabPosition) {
        // Tab along the top, attach to the bottom of the screen in the centre
        case WindowTabLocationEnum.TOP_LEFT:
        case WindowTabLocationEnum.TOP_RIGHT:
            x = Config.Graphics.startX - trueWidth/2;
            y = Config.Graphics.startY * 2 - ((this.expanded) ? this.baseHeight : 0);
            break;
        case WindowTabLocationEnum.BOTTOM_LEFT:
        case WindowTabLocationEnum.BOTTOM_RIGHT:
            x = Config.Graphics.startX - (trueWidth/2);
            y = - 2 * this.padding; 
            break;
        case WindowTabLocationEnum.LEFT_TOP:
        case WindowTabLocationEnum.LEFT_BOTTOM:
            x = Config.Graphics.startX * 2 - ((this.expanded) ? this.baseWidth : 0);
            y = Config.Graphics.startY - (trueHeight/2);
            break;
        case WindowTabLocationEnum.RIGHT_TOP:
        case WindowTabLocationEnum.RIGHT_BOTTOM:
            x = - 2 * this.padding;
            y = Config.Graphics.startY - (trueHeight/2);
            break; 
    }
    
    return {x: x, y: y};
};

CollapsableWindow.prototype.draw = function(ctx) {
    // Change the window location as appropriate
    if(this.expanded) {
        this.width  = this.baseWidth;
        this.height = this.baseHeight;
    } else {
        this.width  = 0;
        this.height = 0;
    }
    var loc = this.location();
    this.x = loc.x;
    this.y = loc.y;
    
    UiWindow.prototype.draw.call(this,ctx);
};

CollapsableWindow.prototype.isWithin = function(x,y) {
    var inBase = UiWindow.prototype.isWithin.call(this,x,y);
    var inTab  = UiWindow.prototype.isWithinTab.call(this,x,y);
    return inBase || inTab;
};

CollapsableWindow.prototype.click = function(mouse) {
    if(this.highlighted) {
        this.expanded = !this.expanded;
        this.highlighted = false;
    }
};
