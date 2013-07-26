var CardWindow = function() {
    CollapsableWindow.call(this,
        400,
        80,
        5,
        true,
        'Cards',
        WindowTabLocationEnum.TOP_LEFT,
        true
	);
	
	var woodCard = new UiCard(
	    0,
	    0,
	    TileEnums.WOOD,
	    Game.playerData.wood
	);
	var brickCard = new UiCard(
	    5 + Config.Graphics.cardWidth,
	    0,
	    TileEnums.BRICK,
	    Game.playerData.brick
	);
	var wheatCard = new UiCard(
	    10 + 2*Config.Graphics.cardWidth,
	    0,
	    TileEnums.WHEAT,
	    Game.playerData.wheat
	);
	var woolCard = new UiCard(
	    15 + 3*Config.Graphics.cardWidth,
	    0,
	    TileEnums.WOOL,
	    Game.playerData.wool
	);
	var oreCard = new UiCard(
	    20 + 4*Config.Graphics.cardWidth,
	    0,
	    TileEnums.ORE,
	    Game.playerData.ore
	);
	
	this.contents.push(woodCard);
	this.contents.push(brickCard);
	this.contents.push(wheatCard);
	this.contents.push(woolCard);
	this.contents.push(oreCard);
	this.contents.push(new UiSeparator(30 + 5*Config.Graphics.cardWidth, 0, 67));
};

CardWindow.prototype = new CollapsableWindow;
CardWindow.constructor = CardWindow;