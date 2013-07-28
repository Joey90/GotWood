function toggleOverlayDebug() {
    Config.Graphics.overlayDebug = !Config.Graphics.overlayDebug;
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
