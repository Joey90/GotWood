var ControlWindow = function() {
    CollapsableWindow.call(this,
        100,
        400,
        5,
        true,
        'Controls',
        WindowTabLocationEnum.LEFT_TOP,
        false
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
};

ControlWindow.prototype = new CollapsableWindow;
ControlWindow.constructor = ControlWindow;