function registerMouseHandlers() {
    var canvas = document.getElementById('uiCanvas');
    canvas.addEventListener('mousemove', _handleMouseMove);
    canvas.addEventListener('mousedown', _handleMouseClick);
}

function _handleMouseMove(event) {
    var mouse = trueMouse(event);

    // UI layer has top priority for mouse detection
    for(var k in Game.UiLayer) {
        if(Game.UiLayer[k].isWithin(mouse.x, mouse.y)) {
            Game.UiLayer[k].mouseOver(mouse);
        } else {
            Game.UiLayer[k].mouseOut(mouse);
        }
        Game.UiLayer[k].highlighted = Game.UiLayer[k].isWithinTab(mouse.x, mouse.y);
    }
    
    // If the overlay is active, calculate any hits for it
    if(Game.State[Game.State.length - 1] == StateEnum.OVERLAY_ACTIVE) {
        for(var i = 0; i < Game.OverlayLayer.length; i++) {
            Game.OverlayLayer[i].highlighted = Game.OverlayLayer[i].isWithin(mouse.x, mouse.y);
        }
        redrawOverlay();
    }

    // Info window calculation.
    Game.UiLayer.infoWindow.visible = false;
    Game.UiLayer.infoWindow.currentTile = -1;

    for(var i = 0; i < Game.TileLayer.length; i++) {
        if(Game.TileLayer[i].isWithin(mouse.x, mouse.y)) {
            Game.UiLayer.infoWindow.visible = true;
            Game.UiLayer.infoWindow.currentTile = i;
            break;
        }
    }
    redrawUi();
}

function _handleMouseClick(event) {
    var mouse = trueMouse(event);

    // Dispel the Dice window if it was being displayed
    if (Game.UiLayer.diceWindow != null) {Game.UiLayer.diceWindow.visible = false;}

    // Check to see if a UI window was clicke in
    for(var k in Game.UiLayer) {
        Game.UiLayer[k].highlighted = Game.UiLayer[k].isWithinTab(mouse.x, mouse.y);
        if(Game.UiLayer[k].isWithin(mouse.x, mouse.y)) {
            hit = true;
            Game.UiLayer[k].click(mouse);
        }
    }
    
    // If the overlay is active, calculate any hits, 
    if(Game.State[Game.State.length - 1] == StateEnum.OVERLAY_ACTIVE) {
        for(var i = 0; i < Game.OverlayLayer.length; i++) {
            Game.OverlayLayer[i].highlighted = Game.OverlayLayer[i].isWithin(mouse.x, mouse.y);
            if(Game.OverlayLayer[i].highlighted) {
                Game.OverlayCallback(Game.OverlayLayer[i], Game.OverlayCallbackArgs);
                hideOverlay();
                break;
            }
        }
    }
    
    redrawUi();
}

function trueMouse(e) {
    var canvas = document.getElementById('mapCanvas');
    var offsetX = 0, offsetY = 0, mx, my;

    if(canvas.offsetParent !== undefined) {
        do {
            offsetX += canvas.offsetLeft;
            offsetY += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));

        mx = (e.pageX - offsetX) / Config.Graphics.scale;
        my = (e.pageY - offsetY) / Config.Graphics.scale;
    }

    return {x: mx, y: my};
}