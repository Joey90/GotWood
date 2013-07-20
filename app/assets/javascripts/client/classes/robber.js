var Robber = function(tile) {
    this.tile = tile;
}

Robber.prototype.draw = function(ctx) {
    var coords = tileCoordinates(this.tile);
    
    ctx.save();
    ctx.translate(coords.x, coords.y);
    
    // We need to compute the angle removed from the arc.
    // Thankfully we know the cosine law:
    var h = Config.Graphics.robberHeight; // Robber body height
    var w = Config.Graphics.robberWidth; // Robber body width
    var r = Config.Graphics.robberRadius;  // Robber head radius
        
    var theta = Math.acos(1 - Math.pow(w,2)/(2*Math.pow(r,2)));
    var phi   = (Math.PI - theta)/2;
    
    // Draw the robber's shadow
    drawShadow(ctx, 0, h/2, Config.Graphics.robberShadowMax, Config.Graphics.robberShadowMin);
    
    // Construct the robber path
    ctx.beginPath();
    ctx.moveTo(w/2, -h/2);
    ctx.arc(0, -h/2 - r * Math.cos(theta/2), r, phi, theta + phi, true);
    ctx.quadraticCurveTo(-w, h/3, -w/2, h/2);
    ctx.quadraticCurveTo(0, 2*h/3, w/2, h/2);
    ctx.quadraticCurveTo(w, h/3, w/2, -h/2);
    
    // Construct the radial gradient
    var grad = ctx.createRadialGradient(0, -h/2 - 1.5 * r * Math.cos(theta/2), 3, 0, -h/2 - 1.5 * r * Math.cos(theta/2), 2*w);
    grad.addColorStop(0, 'Grey');
    grad.addColorStop(1, 'DarkSlateGrey');
    
    ctx.fillStyle = grad;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = Config.Graphics.lineWidth;
    ctx.fill();
    ctx.stroke();
    
    
    ctx.restore();
}
