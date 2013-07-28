var OverlayInfoWindow = function(isBuilding, structure, canCancel) {
    UiWindow.call(this,
        Config.Graphics.startX - 200,
        20,
        400,
        60,
        5,
        true,
        false
    );
    this.isBuilding = isBuilding;
    this.structure = structure;
    this.canCancel = canCancel;
    
    // Add window contents
    if(isBuilding) {
        var structName = '';
        switch(this.structure) {
            case BuildingEnums.SETTLEMENT:
                structName = 'settlement';
                break;
            case BuildingEnums.CITY:
                structName = 'city';
                break;
            case BuildingEnums.ROAD:
                structName = 'road';
                break;
        }
        this.contents.push(
            new UiLabel(0, 0,
                "Choose where you want to place a new " + structName + ".",
                16,
                "Arial",
                "black"
        ));
    } else {
        this.contents.push(
          new UiLabel(0, 0,
              "Choose where you wish to move the robber to.",
              16,
              "Arial",
              "black")  
        );
    }
    
    // Add control buttons
    var showOverlayButton = new UiButton(0, 25, 5, "Show/Hide Valid Locations", 14, "Arial", "Black");
    showOverlayButton.click = function() { toggleOverlayDebug(); redrawOverlay(); };
    this.contents.push(showOverlayButton);
    
    if(this.canCancel) {
        var cancelBuildButton = new UiButton(0, 25, 5, "Cancel Build", 14, "Arial", "Black");
        cancelBuildButton.click = hideOverlay;
        this.contents.push(cancelBuildButton);
    }
};

OverlayInfoWindow.prototype = new UiWindow;
OverlayInfoWindow.constructor = OverlayInfoWindow;

OverlayInfoWindow.prototype.beforeDraw = function(ctx) {
    UiWindow.prototype.beforeDraw.call(this, ctx);
    
    if(this.canCancel) {
        var final = this.contents[this.contents.length - 1];
        final.x = this.width - 2*this.padding - final.width;
    }
    
}
