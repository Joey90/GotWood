var UiPlayerInfo = function(x, y, w, h, player) {
    UiElement.call(this, x, y, w, h);
    this.player = player;
};

UiPlayerInfo.prototype = new UiElement;
UiPlayerInfo.constructor = UiPlayerInfo;

UiPlayerInfo.prototype.draw = function(ctx) {
    var player = Game.playersData[this.player];
    
    // Draw the background
    ctx.fillStyle = Config.Graphics.teamColoursLight[this.player];
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Player name
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.font = Config.Graphics.playerNameFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillText(Game.playersData[this.player].name, 5, 5);
    
    var infoFontSize = 13;
    
    // Info Labels
    ctx.font = infoFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillText("Resources:", 5, 10 + Config.Graphics.playerNameFontSize);
    ctx.fillText("Dev. Cards:", 5, 15 + Config.Graphics.playerNameFontSize + infoFontSize);
    ctx.fillText("Settlements:", 5, 20 + Config.Graphics.playerNameFontSize + 2*infoFontSize);
    ctx.fillText("Cities:", 5, 25 + Config.Graphics.playerNameFontSize + 3*infoFontSize);
    ctx.fillText("Longest Road:", 5, 30 + Config.Graphics.playerNameFontSize + 4*infoFontSize);
    ctx.fillText("Army Size:", 5, 35 + Config.Graphics.playerNameFontSize + 5*infoFontSize);
    
    // "Longest road" should be the longest string, use that as a base
    // for measuring the text.
    var metrics = ctx.measureText("Longest Road:");
    var offset = 10 + metrics.width + 5;
    
    // Write counts
    ctx.fillText(player.cards, offset, 10 + Config.Graphics.playerNameFontSize);
    ctx.fillText(player.dev_cards, offset, 15 + Config.Graphics.playerNameFontSize + infoFontSize);
    
    // TODO: Replace these zeros with correct information
    ctx.fillText(0, offset, 20 + Config.Graphics.playerNameFontSize + 2*infoFontSize);
    ctx.fillText(0, offset, 25 + Config.Graphics.playerNameFontSize + 3*infoFontSize);
    
    ctx.fillText(player.road, offset, 30 + Config.Graphics.playerNameFontSize + 4*infoFontSize);
    ctx.fillText(player.army, offset, 35 + Config.Graphics.playerNameFontSize + 5*infoFontSize);
    
    // Write VP info
    ctx.textAlign = 'right';
    ctx.font = 'bold ' + infoFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;    
    // Settlements
    ctx.fillText( (0 > 0)? '+' + 2*0 : '',
        this.width-15, 20 + Config.Graphics.playerNameFontSize + 2*infoFontSize);
    // Cities
    ctx.fillText( (0 > 0)? '+' + 2*0 : '',
        this.width-15, 25 + Config.Graphics.playerNameFontSize + 3*infoFontSize);
    // Longest road
    ctx.fillText(
        (player.longest_road) ? '+2' : '',
        this.width-15, 30 + Config.Graphics.playerNameFontSize + 4*infoFontSize);
    // Largest army
    ctx.fillText(
        (player.largest_army) ? '+2' : '',
        this.width-15, 35 + Config.Graphics.playerNameFontSize + 5*infoFontSize
    );
    
    // Draw VP star
    ctx.beginPath();
    star(ctx, this.width - 21, 18, 15, 5, 0.5);
    ctx.fillStyle = 'Yellow';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    
    // Write VP text
    ctx.font = 'bold ' + infoFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(player.victory_points, this.width - 21 , 18);
};
