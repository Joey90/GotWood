var UiSeparator = function(x, y, length) {
    UiElement.call(this,
        x,
        y,
        Config.Graphics.separatorWidth,
        length
    );
    
    this.length = length;
};

UiSeparator.prototype = new UiElement;
UiSeparator.constructor = UiSeparator;

UiSeparator.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, this.length - 4);
    ctx.lineWidth = Config.Graphics.separatorWidth;
    ctx.strokeStyle = Config.Graphics.separatorStrokeStyle;
    ctx.stroke();
};
