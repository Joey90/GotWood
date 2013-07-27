var ControlWindow = function() {
    CollapsableWindow.call(this,
        100,
        400,
        5,
        true,
        'Controls',
        WindowTabLocationEnum.LEFT_TOP,
        true
    );
        
    var buildButton = new UiButton(0, 0, 5, "Build", 14, "Arial", "Black", 85, 24);
    var tradeButton = new UiButton(0, 29, 5, " Trade", 14, "Arial", "Black", 85, 24);
    
    buildButton.click = function(mouse) {
    	alert("Build!");
    };
    
    tradeButton.click = function(mouse) {
    	alert("Trade");
    };
    
    this.contents.push(buildButton);
    this.contents.push(tradeButton);
    
    // Debugging controls
    if(Game.Debug) {
        var moveRobber = new UiButton(0, 395 - 6*29, 5,
            "Move Robber", 10, "Arial", "Black", 85, 24);
        moveRobber.click = buildPlaceRobberOverlay;

        var grantResource = new UiButton(0, 395 - 5*29, 5,
            "Set Resources", 10, "Arial", "Black", 85, 24);
        grantResource.click = setPlayerResources;
        
        var toggleEarly = new UiButton(0, 395-4*29, 5,
            "Toggle Early", 14, "Arial", "Black", 85, 24);
        toggleEarly.click = function(m) {
            Game.DebugArgs.early = !Game.DebugArgs.early;
            console.log("Game.DebugArgs.early:", Game.DebugArgs.early);
        };
        
        var roadOverlay = new UiButton(0, 395-3*29, 5,
            "Build Road",
            14, "Arial", "Black", 85, 24
        );
        roadOverlay.click = function(mouse) {
            buildPlaceBuildingOverlay(BuildingEnums.ROAD, Game.playerData.team, Game.DebugArgs.early);
        };
        
        var townOverlay = new UiButton(0, 395-2*29, 5,
            "Build Town",
            14, "Arial", "Black", 85, 24
        );
        townOverlay.click = function(mouse) {
            buildPlaceBuildingOverlay(BuildingEnums.SETTLEMENT, Game.playerData.team, Game.DebugArgs.early);
        };
        
        var cityOverlay = new UiButton(0, 395-1*29, 5,
            "Build City",
            14, "Arial", "Black", 85, 24
        );
        cityOverlay.click = function(mouse) {
            buildPlaceBuildingOverlay(BuildingEnums.CITY, Game.playerData.team, Game.DebugArgs.early);
        };
        
        this.contents.push(toggleEarly);
        this.contents.push(roadOverlay);
        this.contents.push(townOverlay);
        this.contents.push(cityOverlay);
        this.contents.push(grantResource);
        this.contents.push(moveRobber);
        
        this.contents.push(
            new UiLabel(13, 395 - 7*29 + 5,
                "Cheats",
                18,
                "Arial",
                "Black"
            )
        );
        this.contents.push(
            new UiSeparator(0, 395-7*29, 90, true)  
        );
    }
};

ControlWindow.prototype = new CollapsableWindow;
ControlWindow.constructor = ControlWindow;