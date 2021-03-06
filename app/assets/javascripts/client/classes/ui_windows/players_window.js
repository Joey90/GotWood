var PlayersWindow = function() {
    CollapsableWindow.call(this,
        150,
        560,
        5,
        true,
        'Players',
        WindowTabLocationEnum.RIGHT_TOP,
        true);
        
    for(var i = 0; i < 4; i++) {
        this.contents.push(new UiPlayerInfo(0,-5 + (i)*this.height/4, this.width, this.height/4, i));
        if(i != 3)
            this.contents.push(new UiSeparator(-2, -5 + (i+1)*this.height/4, this.width + 4, true));
    }
};


PlayersWindow.prototype = new CollapsableWindow;
PlayersWindow.constructor = PlayersWindow;

/*
PlayersWindow.prototype.drawContent = function(ctx) {
    this.drawBackground(ctx);
    this.drawPlayerInfo(ctx, 0, 0);
    this.drawPlayerInfo(ctx, 1, this.height/4);
    this.drawPlayerInfo(ctx, 2, this.height/2);
    this.drawPlayerInfo(ctx, 3, 3*this.height/4);
};

PlayersWindow.prototype.drawBackground = function(ctx) {
    ctx.fillStyle = Config.Graphics.teamColoursLight[0];
    ctx.fillRect(0, 0, this.width, this.height/4);
    ctx.fillStyle = Config.Graphics.teamColoursLight[1];
    ctx.fillRect(0, this.height/4 - 5, this.width, this.height/4);
    ctx.fillStyle = Config.Graphics.teamColoursLight[2];
    ctx.fillRect(0, this.height/2 - 5, this.width, this.height/4);
    ctx.fillStyle = Config.Graphics.teamColoursLight[3];
    ctx.fillRect(0, 3*this.height/4 - 5, this.width, this.height/4);

    this.drawSeparator(ctx, this.height/4 - 5);
    this.drawSeparator(ctx, this.height/2 - 5);
    this.drawSeparator(ctx, 3*this.height/4 - 5);

}

PlayersWindow.prototype.drawPlayerInfo = function(ctx, team, y) {
    var player = Game.playersData[team];
    var max_vps = ((player.victory_points >= Game.playersData[0].victory_points) &&
        (player.victory_points >= Game.playersData[1].victory_points) &&
        (player.victory_points >= Game.playersData[2].victory_points) &&
        (player.victory_points >= Game.playersData[3].victory_points));

    if (max_vps) {
        this.drawHighlight(ctx, -10, y + 10 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight, 20,
            Config.Graphics.teamColours[player.team], Config.Graphics.teamColoursLight[player.team]);
    }

    if (player.largest_army) {
        this.drawHighlight(ctx, this.width/3 - 10, y + 10 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight, 20,
            Config.Graphics.teamColours[player.team], Config.Graphics.teamColoursLight[player.team]);
    }
    if (player.longest_road) {
        this.drawHighlight(ctx, 2*this.width/3 - 10, y + 10 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight, 20,
            Config.Graphics.teamColours[player.team], Config.Graphics.teamColoursLight[player.team]);
    }

    this.drawVPIcon(ctx, 0, y + 20 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight);
    this.drawArmyIcon(ctx, this.width/3, y + 20 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight);
    this.drawRoadIcon(ctx, 2*this.width/3, y + 20 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight);

    this.drawCard(ctx, 10, y + 10 + Config.Graphics.playerNameFontSize, Config.Graphics.resourceCardFill, player.cards);
    this.drawCard(ctx, 20 + Config.Graphics.cardWidth, y + 10 + Config.Graphics.playerNameFontSize, Config.Graphics.developmentCardFill, player.dev_cards);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.font = Config.Graphics.playerNameFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillText(player.name, 5, y);
    ctx.font = Config.Graphics.uiWindowFontSize.toString() + 'px ' + Config.Graphics.uiWindowFont;
    ctx.fillText(player.victory_points, 2 + 2 * Config.Graphics.starRadius, y + 20 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight);
    ctx.fillText(player.army, 2 + Config.Graphics.armySize + this.width/3, y + 20 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight);
    ctx.fillText(player.road, 7 + Config.Graphics.roadWidth + 2*this.width/3, y + 20 + Config.Graphics.playerNameFontSize + Config.Graphics.cardHeight);
};

PlayersWindow.prototype.drawCard = function(ctx, x, y, fill, number) {
    ctx.beginPath();
    roundedRect(ctx, x, y, Config.Graphics.cardWidth, Config.Graphics.cardHeight, 3);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = Config.Graphics.strokeStyle;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = Config.Graphics.uiWindowFontFill;
    ctx.font = Config.Graphics.diceNumFont;
    ctx.fillText(number, x + Config.Graphics.cardWidth/2, y + Config.Graphics.cardHeight/2);
};

PlayersWindow.prototype.drawVPIcon = function(ctx, x, y) {
    star(ctx, x + Config.Graphics.starRadius, y + Config.Graphics.starRadius, Config.Graphics.starRadius, 5, 0.5);
    ctx.fillStyle = Config.Graphics.starFill;
    ctx.fill();
    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    ctx.stroke();
};

PlayersWindow.prototype.drawArmyIcon = function(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y + Math.sqrt(3)*Config.Graphics.armySize/2);
    ctx.lineTo(x + Config.Graphics.armySize/2, y);
    ctx.lineTo(x + Config.Graphics.armySize, y + Math.sqrt(3)*Config.Graphics.armySize/2);
    ctx.closePath();

    ctx.fillStyle = Config.Graphics.armyFill;
    ctx.fill();

    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    ctx.stroke();
};

PlayersWindow.prototype.drawRoadIcon = function(ctx, x, y) {
    ctx.fillStyle = Config.Graphics.roadFill;
    ctx.fillRect(x+2, y, Config.Graphics.roadWidth, Config.Graphics.roadHeight);

    ctx.strokeStyle = Config.Graphics.uiWindowStroke;
    ctx.lineWidth = Config.Graphics.uiWindowLineWidth;
    ctx.beginPath();
    ctx.moveTo(x+2, y);
    ctx.lineTo(x+2, y+Config.Graphics.roadHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x+2+Config.Graphics.roadWidth, y);
    ctx.lineTo(x+2+Config.Graphics.roadWidth, y+Config.Graphics.roadHeight);
    ctx.stroke();
}

PlayersWindow.prototype.drawSeparator = function(ctx, y) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(this.width, y)
    ctx.lineWidth = Config.Graphics.separatorWidth;
    ctx.strokeStyle = Config.Graphics.separatorStrokeStyle;
    ctx.stroke();
};

PlayersWindow.prototype.drawHighlight = function(ctx, x, y, r, fill1, fill2) {
    var grd = ctx.createRadialGradient(x+r, y+r, 0, x+r, y+r, r);
    grd.addColorStop(0.3, fill1);
    grd.addColorStop(1, fill2);
    ctx.fillStyle = grd;
    ctx.fillRect(x,y,2*r,2*r);
} */