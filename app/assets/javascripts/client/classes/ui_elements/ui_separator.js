var UiSeparator = function(x, y, length, horiz) {
    if(horiz === "undefined") {
        this.horiz = false;
    } else {
        this.horiz = horiz;
    }
    UiElement.call(this,
        x,
        y,
        (this.horiz) ? length : Config.Graphics.separatorWidth,
        (this.horiz) ? Config.Graphics.separatorWidth : length
    );
    
    this.length = length;
};

UiSeparator.prototype = new UiElement;
UiSeparator.constructor = UiSeparator;

UiSeparator.prototype.draw = function(ctx) {
    if(this.horiz) {
        ctx.save();
        ctx.rotate(-Math.PI/2);
    }
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, this.length - 4);
    ctx.lineWidth = Config.Graphics.separatorWidth;
    ctx.strokeStyle = Config.Graphics.separatorStrokeStyle;
    ctx.stroke();
    if(this.horiz) {
        ctx.restore();
    }
};
