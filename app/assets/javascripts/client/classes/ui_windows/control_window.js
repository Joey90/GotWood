var ControlWindow = function() {
    CollapsableWindow.call(this,
        80,
        400,
        5,
        true,
        'Controls',
        WindowTabLocationEnum.LEFT_TOP,
        false);
};

ControlWindow.prototype = new CollapsableWindow;
ControlWindow.constructor = ControlWindow;

ControlWindow.prototype.drawContent = function(ctx) {
    this.drawButton(ctx, 0, 30, 'Build');
};

ControlWindow.prototype.drawButton = function(ctx, y, height, text) {
    roundedRect(ctx, 0, y, this.width - 10, height, 5);
    ctx.fillStyle = Config.Graphics.controlButtonFill;
    ctx.fill();
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.stroke();

    ctx.fillStyle = Config.Graphics.uiWindowFontFill
    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, this.width/2 - 5, y + height/2);
}