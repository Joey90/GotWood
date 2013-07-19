var Settlement = function(vertex, team) {
	this.vertex = vertex;
	this.team = team;
}

Settlement.prototype.victoryPoints = 1;

Settlement.prototype.draw = function(ctx) {
	drawVillage(ctx, this.team, this.vertex);
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
