function redrawMap(ctx) {
    drawMap(ctx, TestingData.tileData);
    drawPorts(ctx, TestingData.portData);

}

function vertexCoordinates(vertexId) {
	var spaceX = Config.Graphics.length * Math.sqrt(3);
	var offsetX = -Config.Graphics.length * Math.sqrt(3) / 2;
	var offsetY = 3 * Config.Graphics.length / 2;

	var spacing;
	var tileIndex;
	var jaggedBool;
	
	// If we can deduce what row the vertex is on we can easily deduce its coordinates
	// Thankfully we've agreed to use a sensible vertex numbering scheme.
	if(vertexId < 7) {
		spacing = Math.floor(vertexId / 2);
		tileIndex = 0;
		jaggedBool = vertexId % 2 == 0;
	} else if(vertexId < 16) {
		spacing = Math.floor( (vertexId - 7)/2 );
		tileIndex = 3;
		jaggedBool = vertexId %2 == 1;
	} else if(vertexId < 27) {
		spacing = Math.floor( (vertexId - 16)/2 );
		tileIndex = 7;
		jaggedBool = vertexId % 2 == 0;
	} else if(vertexId < 38) {
		spacing = Math.floor( (vertexId - 27)/2 );
		tileIndex = 7;
		jaggedBool = vertexId % 2 == 1;
	} else if(vertexId < 47) {
		spacing = Math.floor( (vertexId - 38)/2 );
		tileIndex = 12;
		jaggedBool = vertexId % 2 == 0;
	} else {
		spacing = Math.floor( (vertexId - 47)/2 );
		tileIndex = 16;
		jaggedBool = vertexId % 2 == 1
	}
	
	var sgn = (vertexId - 26.5 ) < 0 ? -1 : 1
	
	var baseY = sgn*((jaggedBool) ? (1/2) : 1) * Config.Graphics.length;
	var baseX = (jaggedBool) ? offsetX : 0;
	var x = Config.Graphics.startX + offsetX * Config.Graphics.xOffsets[tileIndex]
		    + spacing * spaceX + baseX;
	var y = Config.Graphics.startY + offsetY * Config.Graphics.yOffsets[tileIndex]
		    + baseY;
	
	return {x: x, y: y};
}

function drawMap(ctx, tileData) {
    // Spacing and offset constants
    var spaceX = Config.Graphics.length * Math.sqrt(3);
    var offsetX = - Config.Graphics.length * Math.sqrt(3) / 2;
    var offsetY = 3 * Config.Graphics.length / 2;
   
    // Draw the ocean hexagon
    // We need to calculate the rotated centre, we centre on the 10th hexagon
    var x = Config.Graphics.startX;
    var y = Config.Graphics.startY;
    
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
        
        tileInfo = Config.Graphics.tiles[tileData[i].resource];
        
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

function drawPorts(ctx, portData) {
    // We need to be able to work out the "anchor" vertex of each port,
    var spaceX  = Config.Graphics.length * Math.sqrt(3);
    var offsetX = - Config.Graphics.length * Math.sqrt(3) / 2;
    var offsetY = 3 * Config.Graphics.length / 2;
    var cosPi6  = Math.cos(Math.PI/6);
    var sinPi6  = 0.5;
    
    for(var i = 0; i < portData.length; i++) {
        
        var coordsA = vertexCoordinates(portData[i].startVertex);
        var coordsB = vertexCoordinates(portData[i].endVertex);
        var angle = Math.acos((coordsB.y - coordsA.y)/Config.Graphics.length);
        angle = (coordsB.x - coordsA.x > 0) ? -angle : angle;
        
        // Save the context state
        ctx.save();
        
        // Transform the context so that the port edge is aligned with the y-axis
        ctx.translate(coordsA.x, coordsA.y);
        ctx.rotate(angle);
        
        // Draw the port trapezium
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Config.Graphics.portLength * cosPi6, Config.Graphics.portLength * sinPi6);
        ctx.lineTo(Config.Graphics.portLength * cosPi6,
            Config.Graphics.length - Config.Graphics.portLength * sinPi6);
        ctx.lineTo(0, Config.Graphics.length);
        ctx.closePath();
        
        // Fill in dat trapezium
        ctx.lineWidth = Config.Graphics.lineWidth;
        ctx.strokeStyle = Config.Graphics.strokeStyle;
        ctx.fillStyle = Config.Graphics.portFill;
        ctx.stroke();
        ctx.fill();
        
        // Save the context
        ctx.save();
        ctx.rotate(Math.PI/2);
        
        // Write the text
        ctx.font = Config.Graphics.font;
        ctx.fillStyle = Config.Graphics.fontColor;
        ctx.textAlign = 'center';
        
        var tradeRate = '2:1';
        var resource = '';
        switch(portData[i].resource) {
            case TileEnums.DESERT:
                resource = 'ANY';
                tradeRate = '3:1';
                break;
            case TileEnums.WOOD:
                resource = 'WOOD';
                break;
            case TileEnums.BRICK:
                resource = 'BRICK';
                break;
            case TileEnums.WHEAT:
                resource = 'WHEAT';
                break;
            case TileEnums.WOOL:
                resource = 'WOOL';
                break;
            case TileEnums.ORE:
                resource = 'ORE';
                break;
        }

        ctx.font = Config.Graphics.font;
        ctx.fillStyle = Config.Graphics.fontColor;
        ctx.textAlign = 'center';
        
        // The ports with a positive angle need their text rotating to be legible.
        if( angle > 0 ) {
        	// Rotate the frame a half circle to make the text legible
        	ctx.save();
        	ctx.rotate(Math.PI);
        	
            ctx.fillText(tradeRate, -Config.Graphics.length/2,20);
            ctx.fillText(resource, -Config.Graphics.length/2, 50);
            
            ctx.restore();
        } else {
            ctx.fillText(tradeRate, Config.Graphics.length/2, -5);
            ctx.fillText(resource, Config.Graphics.length/2, -30);
        }
        
        // Fully restore the context
        ctx.restore();
        ctx.restore();
    }
}