var InfoWindow = new UiWindow(10, 10, 400, 40);

InfoWindow.currentTile = -1;

InfoWindow.drawContent = function(ctx) {
	ctx.fillStyle = 'Black';
	ctx.font = '14pt Helvetica';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	
	if(this.currentTile >= 0) {
		var tile = Game.tileData[this.currentTile - 1];
		console.log(this.currentTile);
		ctx.fillText(Config.Graphics.tiles[tile.resource].label + ", produces " + Config.Resources[tile.resource].name.toLowerCase() + ".", 0, 0);
	}
	
}
