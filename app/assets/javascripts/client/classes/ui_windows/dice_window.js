var DiceWindow = function(dice1, dice2) {
    UiWindow.call(this,
        Config.Graphics.startX - Config.Graphics.dieWidth - 7.5,
        200,
        Config.Graphics.dieWidth*2 + 25,
        Config.Graphics.dieWidth + 20,
        5,
        true,
        false
    );

    var die1 = new UiDie(5, 5, dice1);
    var die2 = new UiDie(10 + Config.Graphics.dieWidth, 5, dice2);

    this.contents.push(die1);
    this.contents.push(die2);
};

DiceWindow.prototype = new UiWindow;
DiceWindow.constructor = DiceWindow;