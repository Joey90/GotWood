var OverlayHexagon = function(structure) {
    var loc = structure.centre();
    Hexagon.call(this,
        Config.Graphics.length / 2,
        loc.x,
        loc.y,
        Config.Graphics.overlayDebugFill, // For debugging purposes
        Config.Graphics.overlayDebugStroke,
        0
    );
    this.struct = structure;
    this.highlighted = false;
};

OverlayHexagon.prototype = new Hexagon;
OverlayHexagon.constructor = OverlayHexagon;

OverlayHexagon.prototype.draw = function(ctx) {

    if(Config.Graphics.overlayDebug == true) {
        this.draw(ctx);
    }

    if(this.highlighted) {
        ctx.save();
        ctx.globalAlpha = Config.Graphics.testPlacementAlpha;
        this.struct.draw(ctx);
        ctx.restore();
    }
};