function redrawBuildings(ctx) {
	console.log("Redrawing all buildings.");
	
	for(var i = 0; i < Game.BuildingsLayer; i++) {
		Game.BuildingLayer[i].draw();
	}

}

/** Road functions **/

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
 