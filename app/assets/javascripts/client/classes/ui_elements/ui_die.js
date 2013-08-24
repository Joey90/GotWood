var UiDie = function (x, y, number) {
    UiElement.call(this,
        x,
        y,
        Config.Graphics.dieWidth,
        Config.Graphics.dieWidth
    );
    this.number = number;

    UiDie.prototype.draw = function(ctx) {
        ctx.beginPath();
        roundedRect(ctx, 0, 0, Config.Graphics.dieWidth, Config.Graphics.dieWidth, 3);

        ctx.fillStyle = 'rgb(256,256,256)';
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillStyle = Config.Graphics.uiWindowFontFill;
        ctx.font = Config.Graphics.cardFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
        ctx.fillText(this.number, Config.Graphics.dieWidth/2, 5);
        ctx.font = Config.Graphics.diceNumFont;
    }
};

UiDie.prototype = new UiElement;
UiDie.constructor = UiDie;