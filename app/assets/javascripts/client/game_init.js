function init() {
    WebFontConfig = {
        google: { families: [ 'Cantora One' ] },
        active: function() {console.log('Loaded font');}
    };

	var startButton = document.getElementById('startGameButton');
	startButton.onclick = function() {
		startButton.innerHTML = "Preparing...";
		startButton.className = "gameButton loading";
		
		$.ajax({
			url: '/game/init',
			dataType: 'html',
			success: function(data) {
				console.log(data);
				if(data == "initialised") {
					startButton.innerHTML = "Game Ready!";
					startButton.className = "gameButton ready";
					window.location.href = '/client/game_board';
				} else {
                    startButton.innerHTML = "Something Went Wrong!";
                    startButton.className = "gameButton failed";
                    setTimeout(function () {
                        startButton.innerHTML = "Start New Game";
                        startButton.className = "gameButton unloaded";
                    }, 1000)
                }
			},
            error: function() {
                startButton.innerHTML = "Something Went Wrong!";
                startButton.className = "gameButton failed";
                setTimeout(function () {
                    startButton.innerHTML = "Start New Game";
                    startButton.className = "gameButton unloaded";
                }, 1000)
            }
		})
	};

    var continueButton = document.getElementById('continueGameButton');
    continueButton.onclick = function() {
        continueButton.innerHTML = "Game Ready!";
        continueButton.className = "gameButton ready";
        window.location.href = '/client/game_board';
    };

    var passcodeButton = document.getElementById('passcodeButton');
    passcodeButton.onclick = function() {
        var passcode = document.getElementById('passcodeInput').value;
        console.log(passcode);
        passcodeButton.innerHTML = "Validating...";
        passcodeButton.className = "gameButton loading";
        $.ajax({
            url: '/game/set_cookie',
            data: 'passcode='+passcode,
            success: function(data) {
                if(data == 'cookie set') {
                    passcodeButton.innerHTML = "Game Ready!";
                    passcodeButton.className = "gameButton ready";
                    window.location.href = '/client/game_board';
                } else {
                    passcodeButton.innerHTML = "Invalid Passcode!";
                    passcodeButton.className = "gameButton failed";
                    setTimeout(function () {
                        passcodeButton.innerHTML = "Enter Passcode";
                        passcodeButton.className = "gameButton unloaded";
                    }, 1000)
                }
            },
            error: function() {
                passcodeButton.innerHTML = "Something Went Wrong!";
                passcodeButton.className = "gameButton failed";
                setTimeout(function () {
                    passcodeButton.innerHTML = "Enter Passcode";
                    passcodeButton.className = "gameButton unloaded";
                }, 1000)
            }
        })
    };

}
