function draw() {
var canvas = document.getElementById('mapCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        drawMap(ctx, TestingData.tileData);
    }
}

function drawMap(ctx, tileData) {
    // Spacing and offset constants
    var spaceX = Config.Graphics.length * Math.sqrt(3);
    var offsetX = - Config.Graphics.length * Math.sqrt(3) / 2;
    var offsetY = 3 * Config.Graphics.length / 2;
   
    // Draw the ocean hexagon
    // We need to calculate the rotated centre, we centre on the 10th hexagon
    var x = Config.Graphics.startX + offsetX * 2 + spaceX * 2;
    var y = Config.Graphics.startY + offsetY * 2;
    
    ctx.rotate(Math.PI/6);
    drawHexagon(ctx,
        Math.cos(Math.PI/6)*x + Math.sin(Math.PI/6)*y, // We need to undo the rotation to find the proper centre
        Math.cos(Math.PI/6)*y - Math.sin(Math.PI/6)*x,
        450,
        Config.Graphics.oceanFill,
        Config.Graphics.strokeStyle,
        Config.Graphics.lineWidth);
    ctx.rotate(-Math.PI/6);
    
    // Iterate over the tile data and draw the map!
    for(var i = 0; i < 19; i++) {
               
        var xPos = Config.Graphics.startX + offsetX * Config.Graphics.xOffsets[i] + spaceX * Config.Graphics.spaces[i];
        var yPos = Config.Graphics.startY + offsetY * Config.Graphics.yOffsets[i];
        
        tileInfo = Config.Graphics.tiles[tileData[i].tile];
        
        // Draw the base hexagon
        drawHexagon(ctx,
            xPos,
            yPos,
            Config.Graphics.length,
            tileInfo.fill,
            Config.Graphics.strokeStyle,
            Config.Graphics.lineWidth);
        
        // Draw the text label
        ctx.font = Config.Graphics.font;
        ctx.fillStyle = Config.Graphics.fontColor;
        ctx.textAlign = Config.Graphics.textAlign;
        ctx.fillText(tileInfo.label, xPos, yPos);
    }
}

function drawHexagon(ctx, centreX, centreY, length, fillStyle, strokeStyle, lineWidth) {
    // Draw the hexagon
    ctx.beginPath();
    
    // Assuming point-up hexagons
    ctx.moveTo(centreX, centreY - length);
    ctx.lineTo(centreX + length * Math.cos(Math.PI/6), centreY - (length / 2));
    ctx.lineTo(centreX + length * Math.cos(Math.PI/6), centreY + (length / 2));
    ctx.lineTo(centreX, centreY + length);
    ctx.lineTo(centreX - length * Math.cos(Math.PI/6), centreY + (length / 2));
    ctx.lineTo(centreX - length * Math.cos(Math.PI/6), centreY - (length / 2));
    ctx.closePath();
    
    // Stroke that hexagon ;)
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.stroke();
    ctx.fill();
}
