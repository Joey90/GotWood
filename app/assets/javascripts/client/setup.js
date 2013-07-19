function init() {
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	window.onresize = function(event) {
		console.log("Window resized: Redrawing canvas."); 
		resizeCanvas();
		redrawCanvas(ctx);
	}

	resizeCanvas();
	redrawCanvas(ctx);
}

function resizeCanvas() {
	var canvas = document.getElementById('mapCanvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight - 2;
	
	Config.Graphics.startX = canvas.width / 2;
	Config.Graphics.startY = canvas.height/ 2;
}

function redrawCanvas(ctx) {
	
	redrawMap(ctx);
	redrawBuildings(ctx);
	
}
