function redrawMap(ctx) {
	drawMap(ctx);
    console.log("Redrawing ports.");
    drawPorts(ctx, TestingData.portData);

}

function tileCoordinates(tileId) {
	// Spacing and offset constants
    var spaceX = Config.Graphics.length * Math.sqrt(3);
    var offsetX = - Config.Graphics.length * Math.sqrt(3) / 2;
    var offsetY = 3 * Config.Graphics.length / 2;
    
    return {x: Config.Graphics.startX + offsetX * Config.Graphics.xOffsets[tileId] + spaceX * Config.Graphics.spaces[tileId],
    		y: Config.Graphics.startY + offsetY * Config.Graphics.yOffsets[tileId]};
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

function edgeCoordinates(edgeId) {
	var v1 = 0;
	var v2 = 0;
	
	if(edgeId < 6) {
		v1 = edgeId;
		v2 = v1 + 1;
	} else if(edgeId < 10) {
		v1 = 2*(edgeId - 6);
		v2 = 8 + v1; 
	} else if(edgeId < 18) {
		v1 = edgeId - 3;
		v2 = v1 + 1;
	} else if(edgeId < 23) {
		v1 = 2*(edgeId - 18) + 7;
		v2 = 10 + v1;
	} else if(edgeId < 33) {
		v1 = edgeId - 7;
		v2 = v1 + 1;
	} else if(edgeId < 39) {
		v1 = 2*(edgeId - 33) + 16;
		v2 = 11 + v1;
	} else if(edgeId < 49) {
		v1 = edgeId - 12;
		v2 = v1 + 1;
	} else if(edgeId < 54) {
		v1 = 2*(edgeId - 49) + 28;
		v2 = 10 + v1;
	} else if(edgeId < 62) {
		v1 = edgeId - 16;
		v2 = v1 + 1;
	} else if(edgeId < 66) {
		v1 = 2*(edgeId - 62) + 39;
		v2 = 8 + v1;
	} else {
		v1 = edgeId - 19;
		v2 = v1 + 1; 
	}
	
	var coordsA = vertexCoordinates(v1);
	var coordsB = vertexCoordinates(v2);
	
	return {x: (coordsA.x + coordsB.x)/2, y: (coordsA.y + coordsB.y)/2 };
}
	
function edgeOrientation(edgeId) {
	
	// Vertical edges
	if(
		(edgeId >=  6 && edgeId < 10)
	||  (edgeId >= 18 && edgeId < 23)
	||  (edgeId >= 33 && edgeId < 39)
	||  (edgeId >= 49 && edgeId < 54)
	||  (edgeId >= 62 && edgeId < 66) 
	) {
		return RoadOrientationEnums.Vertical;
	} else if(
		(edgeId >=  0 && edgeId <  6 && edgeId % 2 == 1)
	||  (edgeId >= 10 && edgeId < 18 && edgeId % 2 == 1)
	||  (edgeId >= 23 && edgeId < 33 && edgeId % 2 == 0)
	||  (edgeId >= 39 && edgeId < 49 && edgeId % 2 == 1)
	||  (edgeId >= 54 && edgeId < 62 && edgeId % 2 == 0)
	||  (edgeId >= 66 && edgeId < 72 && edgeId % 2 == 0)
	) {
		return RoadOrientationEnums.Rising;
	} else {
		return RoadOrientationEnums.Declining;
	}
	
}

function drawMap(ctx) {
	console.log("Redrawing the game board.");
    // Iterate over the tile data and draw the map!
    for(var i = 0; i < Game.TileLayer.length; i++) {
    	Game.TileLayer[i].draw(ctx);
    }
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
        
        var tradeRate = (portData[i].resource == TileEnums.DESERT) ? '3:1' : '2:1';
        var resource = (portData[i].resource == TileEnums.DESERT) ? 'Any' : Config.Resources[portData[i].resource].name;
        
        ctx.font = Config.Graphics.font;
        ctx.fillStyle = Config.Graphics.fontColor;
        ctx.textAlign = 'center';
        
        // The ports with a positive angle need their text rotating to be legible.
        if( angle % Math.PI > 0 ) {
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