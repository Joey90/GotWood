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
        if(buildingType == BuildingEnums.SETTLEMENT) {
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

function setPlayerResources() {
    var playerPrompt = prompt("Player number (0-3):", Game.playerData.team);
    var resourcePrompt = prompt("Resources, comma-delimited (wood,brick,wheat,wool,ore): ", "5,5,5,5,5");
    var res = resourcePrompt.split(",");
    $.ajax({
        url: '/game/set_resources',
        data: {player: playerPrompt, wood: res[0], brick: res[1], wheat: res[2], wool: res[3], ore: res[4]},
        success: function(data) {
            if(data.result) {
                Game.LoadedStatus.player = false;
                Game.LoadedStatus.players = false;
                var postBuild = function() {
                    if(Game.LoadedStatus.player && Game.LoadedStatus.players) {
                        redrawUi();
                    }
                };
                fetchPlayerData(postBuild);
                fetchPlayersData(postBuild);
            }
        }
    });
}
