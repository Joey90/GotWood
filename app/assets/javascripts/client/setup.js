function init() {
	var canvas = document.getElementById('mapCanvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight - 2;
	
	Config.Graphics.startX = canvas.width/2;
	Config.Graphics.startY = canvas.height/2;
	
	draw();
}
