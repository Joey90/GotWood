var Road = function(edge, team) {
    this.edge = edge;
    this.team = team;
};

Road.prototype.victoryPoints = 0;

Road.prototype.draw = function(ctx) {

    var orientation = edgeOrientation(this.edge);
    var coords = edgeCoordinates(this.edge);

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
            ctx.rotate(Math.PI/2);
            break;
    }

    ctx.beginPath();
    ctx.moveTo(-Config.Graphics.length / 3, - Config.Graphics.villageSize/2 );
    ctx.lineTo(-Config.Graphics.length / 3,   Config.Graphics.villageSize/2 );
    ctx.lineTo( Config.Graphics.length / 3,   Config.Graphics.villageSize/2 );
    ctx.lineTo( Config.Graphics.length / 3, - Config.Graphics.villageSize/2 );
    ctx.closePath();

    ctx.fillStyle = Config.Graphics.teamColours[this.team];
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = Config.Graphics.buildingLineWidth;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
};

Road.prototype.centre = function() {
    return edgeCoordinates(this.edge);
};

Road.prototype.orientation = function() {
    return edgeOrientation(this.edge);
};
