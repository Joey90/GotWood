function redrawBuildings(ctx) {
	// TODO: Get data, do stuff with data, ???, profit.
}

function drawVillage(ctx, team, vertexId) {
	
	var xy = vertexCoordinates(vertexId);
	var teamColour = Config.Graphics.teamColours[team];
	
	drawShadow(ctx, xy.x, xy.y, 20, 5);
	drawVillageFrontWall(ctx, teamColour, xy.x, xy.y, Config.Graphics.villageSize, true);
	drawVillageFrontWall(ctx, Config.Graphics.buildingShade, xy.x, xy.y, Config.Graphics.villageSize, false);
	drawVillageSideWall(ctx, teamColour, xy.x, xy.y, Config.Graphics.villageSize);
	drawVillageRoofFront(ctx, teamColour, xy.x, xy.y, Config.Graphics.villageSize, true);
	drawVillageRoofFront(ctx, Config.Graphics.buildingShade, xy.x, xy.y, Config.Graphics.villageSize, false);
	drawVillageRoofSide(ctx, teamColour, xy.x, xy.y, Config.Graphics.villageSize);
}

function drawVillageFrontWall(ctx, fill, startX, startY, size, stroke) {
	ctx.beginPath();
	
	// Draw the front-facing wall
	ctx.moveTo(startX, startY + size/2);
	ctx.lineTo(startX, startY - size/2);
	ctx.lineTo(startX + size*Math.cos(Math.PI/9), startY - size*Math.sin(Math.PI/9) - size/2);
	ctx.lineTo(startX + size*Math.cos(Math.PI/9), startY - size*Math.sin(Math.PI/9) + size/2);
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	
	if(stroke) {
		ctx.stroke();
	}
}

function drawVillageSideWall(ctx, fill, startX, startY, size) {
	ctx.beginPath();
	
	ctx.moveTo(startX, startY + size/2);
	ctx.lineTo(startX, startY - size/2);
	ctx.lineTo(startX - size*1.1*Math.cos(Math.PI/6), startY - 1.1*size*Math.sin(Math.PI/6) - size/2);
	ctx.lineTo(startX - size*1.1*Math.cos(Math.PI/6), startY - 1.1*size*Math.sin(Math.PI/6) + size/2);
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	ctx.stroke();
}

function drawVillageRoofFront(ctx, fill, startX, startY, size, stroke) {
	ctx.beginPath();
	
	ctx.moveTo(startX, startY - size/2);
	ctx.lineTo(startX + size * Math.cos(Math.PI/9)/2, startY - size * Math.sin(Math.PI/9) - size);
	ctx.lineTo(startX + size * Math.cos(Math.PI/9), startY - size * Math.sin(Math.PI/9) - size/2);
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	if (stroke) {
		ctx.stroke();
	}
}

function drawVillageRoofSide(ctx,fill, startX, startY, size, stroke) {
	ctx.beginPath();
	
	ctx.moveTo(startX + size*Math.cos(Math.PI/9)/2, startY - size*Math.sin(Math.PI/9) - size);
	ctx.lineTo(startX - size*1.1*Math.cos(Math.PI/6) + size*Math.cos(Math.PI/9)/2, startY - 1.1*size*Math.sin(Math.PI/6) - size * Math.sin(Math.PI/9) - size);
	ctx.lineTo(startX - size*1.1*Math.cos(Math.PI/6), startY - 1.1*size*Math.sin(Math.PI/6) - size/2);
	ctx.lineTo(startX, startY - size/2);
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	ctx.stroke();
}

function drawShadow(ctx, startX, startY, major, minor) {
	// There isn't really a good ellipse function yet, so let's fuck around with transforming our reference frame!
	ctx.save();
	
	var maj = Math.max(major, minor);
	var min = Math.min(major, minor);
	
	ctx.translate(startX, startY);
	ctx.scale(1, minor/major);
	ctx.beginPath();
	ctx.arc(0,0, major, 0, 2*Math.PI, true);
	ctx.closePath();
	
	ctx.fillStyle = 'rgba(0,0,0,0.3)';
	ctx.fill();
	
	ctx.restore();
}
