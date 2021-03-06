var Settlement = function(vertex, team) {
    this.vertex = vertex;
    this.team = team;
};

Settlement.prototype.victoryPoints = 1;

Settlement.prototype.draw = function(ctx) {
    drawVillage(ctx, this.team, this.vertex);
};

Settlement.prototype.centre = function() {
    return vertexCoordinates(this.vertex);
};

function drawVillage(ctx, team, vertexId) {

    var xy = vertexCoordinates(vertexId);
    var teamColour = Config.Graphics.teamColours[team];
    var offset = 3;

    drawVillageBase(ctx, Config.Graphics.teamColoursLight[team], xy.x, xy.y);
    drawShadow(ctx, xy.x, xy.y + offset, 17, 11);
    drawVillageFrontWall(ctx, teamColour, xy.x, xy.y + offset, Config.Graphics.villageSize, true);
    drawVillageFrontWall(ctx, Config.Graphics.buildingShade, xy.x, xy.y + offset, Config.Graphics.villageSize, false);
    drawVillageSideWall(ctx, teamColour, xy.x, xy.y + offset, Config.Graphics.villageSize);
    drawVillageRoofSide(ctx, teamColour, xy.x, xy.y + offset, Config.Graphics.villageSize);
}

function drawVillageFrontWall(ctx, fill, startX, startY, size, stroke) {
    ctx.beginPath();

    // Draw the front-facing wall
    ctx.moveTo(startX, startY + size/2);
    ctx.lineTo(startX, startY - size/2);
    ctx.lineTo(startX + size * Math.cos(Math.PI/9)/2, startY - size * Math.sin(Math.PI/9) - size);
    ctx.lineTo(startX + size * Math.cos(Math.PI/9), startY - size * Math.sin(Math.PI/9) - size/2);
    ctx.lineTo(startX + size * Math.cos(Math.PI/9), startY - size * Math.sin(Math.PI/9) + size/2);
    ctx.closePath();

    ctx.fillStyle = fill;
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
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
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.fill();
    ctx.stroke();
}

function drawVillageRoofSide(ctx,fill, startX, startY, size, stroke) {
    ctx.beginPath();

    ctx.moveTo(startX + size*Math.cos(Math.PI/9)/2, startY - size*Math.sin(Math.PI/9) - size);
    ctx.lineTo(startX - size*1.1*Math.cos(Math.PI/6) + size*Math.cos(Math.PI/9)/2, startY - 1.1*size*Math.sin(Math.PI/6) - size * Math.sin(Math.PI/9) - size);
    ctx.lineTo(startX - size*1.1*Math.cos(Math.PI/6), startY - 1.1*size*Math.sin(Math.PI/6) - size/2);
    ctx.lineTo(startX, startY - size/2);
    ctx.closePath();

    ctx.fillStyle = fill;
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.fill();
    ctx.stroke();
}

function drawVillageBase(ctx, fill, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, Config.Graphics.buildingBaseRadius,
        0,
        2 * Math.PI,
        false);
    ctx.fillStyle = fill;
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
    ctx.fill();
    ctx.stroke();
}
