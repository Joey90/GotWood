function init() {
	var button = document.getElementById('startGameButton');
	button.onclick = function() {
		button.innerHTML = "Preparing...";
		button.className = "loading";
		
		$.ajax({
			url: '/game/init',
			dataType: 'html',
			success: function(data) {
				console.log(data);
				if(data == "initialised") {
					button.innerHTML = "Game Ready!"
					button.className = "ready";
					window.location.replace('/client/game_board');
				}
			}
		})
	}
}
