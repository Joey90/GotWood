function redrawBuildings(ctx) {
	console.log("Redrawing all buildings.");
	
	for(var i = 0; i < Game.edgesData.length; i++) {
		if(Game.edgesData[i].road) {
			drawRoad(ctx, Game.edgesData[i].team, i);
		}
	}
	
	for(var i = 0; i < Game.verticesData.length; i++) {
		if(Game.verticesData[i].building == BuildingEnums.VILLAGE) {
			drawVillage(ctx, Game.verticesData[i].team, i);
		} else if(Game.verticesData[i].building == BuildingEnums.CITY) {
			drawCity(ctx, Game.verticesData[i].team, i);
		}
	}
}

/** Village functions **/
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

/** City functions **/

function drawCity(ctx, team, vertexId) {
	var xy = vertexCoordinates(vertexId);
	var teamColour = Config.Graphics.teamColours[team];
	
	drawShadow(ctx, xy.x, xy.y + 5, Config.Graphics.citySize, 5);
	drawCityFrontWall(ctx, teamColour, xy.x, xy.y, Config.Graphics.citySize, true);
	drawCityFrontWall(ctx, Config.Graphics.buildingShade, xy.x, xy.y, Config.Graphics.citySize, false);
	drawCitySideWall(ctx, teamColour, xy.x, xy.y, Config.Graphics.citySize, true);
	drawCitySideRoof(ctx, teamColour, xy.x, xy.y, Config.Graphics.citySize, true);
}

function drawCityFrontWall(ctx, fill, startX, startY, size, stroke) {
	
	ctx.beginPath();
	ctx.moveTo(startX, startY + 0.5 * size);
	ctx.lineTo(startX, startY - 0.5 * size);
	ctx.lineTo(startX + 0.25 * size * Math.cos(Math.PI/9), startY - 0.50 * size - 0.25 * size * Math.sin(Math.PI/9));
	ctx.lineTo(startX + 0.25 * size * Math.cos(Math.PI/9), startY - 0.75 * size - 0.25 * size * Math.sin(Math.PI/9));
	ctx.lineTo(startX + 0.60 * size * Math.cos(Math.PI/9), startY - size - size * Math.sin(Math.PI/9));
	ctx.lineTo(startX + size * Math.cos(Math.PI/9), startY - 0.75 * size - size * Math.sin(Math.PI/9));
	ctx.lineTo(startX + size * Math.cos(Math.PI/9), startY - size * Math.sin(Math.PI/9) + 0.5 * size );
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	
	if(stroke) {
		ctx.stroke();
	} 
}

function drawCitySideWall(ctx, fill, startX, startY, size, stroke) {
	ctx.beginPath();
	
	ctx.moveTo(startX, startY + 0.5 * size);
	ctx.lineTo(startX - 1.1 * size * Math.cos(Math.PI/6), startY + 0.5 * size - 1.1 * size * Math.sin(Math.PI/6));
	ctx.lineTo(startX - 1.1 * size * Math.cos(Math.PI/6), startY - 0.5 * size - 1.1 * size * Math.sin(Math.PI/6));
	ctx.lineTo(startX, startY - 0.5 * size);
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	
	if(stroke) {
		ctx.stroke();
	} 
}

function drawCitySideRoof(ctx, fill, startX, startY, size, stroke) {
	ctx.beginPath();
	
	ctx.moveTo(startX - 1.10 * size * Math.cos(Math.PI/6), startY - 0.5 * size - 1.1 * size * Math.sin(Math.PI/6));
	ctx.lineTo(startX - 1.10 * size * Math.cos(Math.PI/6) + 0.25 * size * Math.cos(Math.PI/9), startY - 0.50 * size - 0.25 * size * Math.sin(Math.PI/9) - 1.1 * size * Math.sin(Math.PI/6));
	ctx.lineTo(startX - 1.10 * size * Math.cos(Math.PI/6) + 0.25 * size * Math.cos(Math.PI/9), startY - 0.75 * size - 0.25 * size * Math.sin(Math.PI/9) - 1.1 * size * Math.sin(Math.PI/6));
	ctx.lineTo(startX - 1.10 * size * Math.cos(Math.PI/6) + 0.60 * size * Math.cos(Math.PI/9), startY - size - size * Math.sin(Math.PI/9) - 1.1 * size * Math.sin(Math.PI/6));
	ctx.lineTo(startX + 0.60 * size * Math.cos(Math.PI/9), startY - size - size * Math.sin(Math.PI/9));
	ctx.lineTo(startX + 0.25 * size * Math.cos(Math.PI/9), startY - 0.75 * size - 0.25 * size * Math.sin(Math.PI/9));
	ctx.lineTo(startX + 0.25 * size * Math.cos(Math.PI/9), startY - 0.50 * size - 0.25 * size * Math.sin(Math.PI/9));
	ctx.lineTo(startX, startY - 0.5 * size);
	ctx.closePath();
	
	ctx.fillStyle = fill;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.fill();
	
	if(stroke) {
		ctx.stroke();
	} 
	
	ctx.beginPath();
	ctx.moveTo(startX + 0.25 * size * Math.cos(Math.PI/9), startY - 0.75 * size - 0.25 * size * Math.sin(Math.PI/9));
	ctx.lineTo(startX - 1.10 * size *Math.cos(Math.PI/6) + 0.25 * size * Math.cos(Math.PI/9), startY - 0.75 * size - 0.25 * size * Math.sin(Math.PI/9) - 1.1 * size * Math.sin(Math.PI/6));
	ctx.closePath();
	
	ctx.stroke();
}

/** Road functions **/
function drawRoad(ctx, team, edgeId) {
	var orientation = edgeOrientation(edgeId);
	var coords = edgeCoordinates(edgeId);
	
	ctx.save();
	ctx.translate(coords.x, coords.y);
	
	switch(orientation) {
		case RoadOrientationEnums.Rising:
			ctx.rotate(Math.PI/6);
			break;
		case RoadOrientationEnums.Declining:
			ctx.rotate(-Math.PI/6);
			break;
		case RoadOrientationEnums.Vertical:
			ctx.rotate(Math.PI/2)
			break;
	}
	
	ctx.beginPath();
	ctx.moveTo(-Config.Graphics.length / 3, - Config.Graphics.villageSize/2 );
	ctx.lineTo(-Config.Graphics.length / 3,   Config.Graphics.villageSize/2 );
	ctx.lineTo( Config.Graphics.length / 3,   Config.Graphics.villageSize/2 );
	ctx.lineTo( Config.Graphics.length / 3, - Config.Graphics.villageSize/2 );
	ctx.closePath();
	
	ctx.fillStyle = Config.Graphics.teamColours[team];
	ctx.strokeStyle = Config.Graphics.strokeStyle;
	ctx.lineWidth = Config.Graphics.lineWidth;
	ctx.fill();
	ctx.stroke();
	
	ctx.restore();
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
 