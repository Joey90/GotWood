var City = function(vertex, team) {
    this.team = team;
    this.vertex = vertex;
};

City.prototype.victoryPoints = 2;

City.prototype.draw = function(ctx) {
    drawCity(ctx, this.team, this.vertex);
};

City.prototype.centre = function() {
    return vertexCoordinates(this.vertex);
};

function drawCity(ctx, team, vertexId) {
    var xy = vertexCoordinates(vertexId);
    var teamColour = Config.Graphics.teamColours[team];
    var offset = 3;

    drawCityBase(ctx, Config.Graphics.teamColoursLight[team], xy.x, xy.y)
    drawShadow(ctx, xy.x, xy.y + offset, 17, 11);
    drawCityFrontWall(ctx, teamColour, xy.x, xy.y + offset, Config.Graphics.citySize, true);
    drawCityFrontWall(ctx, Config.Graphics.buildingShade, xy.x, xy.y + offset, Config.Graphics.citySize, false);
    drawCitySideWall(ctx, teamColour, xy.x, xy.y + offset, Config.Graphics.citySize, true);
    drawCitySideRoof(ctx, teamColour, xy.x, xy.y + offset, Config.Graphics.citySize, true);
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
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
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
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
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
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
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

function drawCityBase(ctx, fill, x, y) {
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