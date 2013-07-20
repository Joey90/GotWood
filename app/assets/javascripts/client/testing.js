function addSettlement(vertex, team) {
    Game.BuildingLayer.push(new Settlement(vertex, team));
    redrawBuildings();
}

function addCity(vertex, team) {
    Game.BuildingLayer.push(new City(vertex, team));
    redrawBuildings();
}

function addRoad(edge, team) {
    Game.BuildingLayer.push(new Road(edge, team));
    redrawBuildings();
}

function hideOverlay() {
    Game.OverlayLayer = [];
    if(Game.State[Game.State.length - 1] == StateEnum.OVERLAY_ACTIVE)
        Game.State.pop();
    redrawOverlay();
}

function showRoadOverlay(team) {
    hideOverlay();

    Game.State.push(StateEnum.OVERLAY_ACTIVE);

    for(var i = 0; i < Config.Graphics.numEdges; i++) {
        Game.OverlayLayer.push(new OverlayHexagon(
            new Road(i, team)
        ));
    }
    redrawOverlay();
}

function showBuildingOverlay(team, buildingType) {
    hideOverlay();

    Game.State.push(StateEnum.OVERLAY_ACTIVE);

    for(var i = 0; i < Config.Graphics.numVertices; i++) {
        var settlement = null;
        if(buildingType == BuildingEnums.VILLAGE) {
            settlement = new Settlement(i, team);
        } else if(buildingType == BuildingEnums.CITY) {
            settlement = new City(i, team);
        }

        Game.OverlayLayer.push(
            new OverlayHexagon(settlement)
        );
    }
    redrawOverlay();
}

function toggleOverlayDebug() {
    Config.Graphics.overlayDebug = !Config.Graphics.overlayDebug;
    redrawOverlay();
}
