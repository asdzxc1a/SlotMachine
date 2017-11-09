function GameUi() {
    //Вводим ранее созданные функции для контроля над ставкой из game.js
	this.onSpin;
	this.onIncreaseCurrentBet;
	this.onDecreaseCurrentBet;

	var betLabel;
	var coinsLabel;
    //Принудительно задаем контекст функции
	var ui = this;
    // Создаем елементы контроля ставки и кнопку ПУСК
	this.create = function() {
		createCoinsLabel();
		createBetLabel();
		createCurrentBetController();
		createSpinButton();
	};
    //Создаем кредиты
	function createCoinsLabel() {
		coinsLabel = helper.parentCenter(createLabel({ x: 345, y: 20}));
		helper.addToScene(createSquare(80, 40, {x: backgroundWidth / 2, y: backgroundHeight - 55}, coinsLabel));
    };
    // Создаем ставку
    function createBetLabel() {
		betLabel = helper.parentCenter(createLabel({ x: 365, y: 20}));
        helper.addToScene(createSquare(80, 40, {x: backgroundWidth / 2, y: backgroundHeight - 105}, betLabel));
    };
    //Стиль ставки и кредитов
    function createLabel(pos) {
    	const l = new PIXI.Text("", {font:"50px Arial", fill:"blue"})
    	l.position = pos;
    	return l;
    };
    // Создаем основу 
    function createSquare(width, height, pos, child) {
    	const square = helper.createSquare(334, 0, width, height);
		square.position = pos;
        square.addChild(child);
        return square;
    };
    //Создаем кнопки контроля ставки
    function createCurrentBetController() {
    	const radius = 20;
    	var x = backgroundWidth / 2 + 440;
    	var y = backgroundHeight - 85;
		helper.addToScene(helper.createLabeledRoundButton("-", x, y, radius, function() {
			ui.onDecreaseCurrentBet();
		}));

		x = backgroundWidth / 2 + 310;
		y = backgroundHeight - 85;
		helper.addToScene(helper.createLabeledRoundButton("+", x, y, radius, function() {
			ui.onIncreaseCurrentBet();
		}));
    };
    // Создаем кнопку ПУСКА
    function createSpinButton() {
    	const radius = 50;
    	const x = backgroundWidth - 120;
    	const y = backgroundHeight - 75;
    	helper.addToScene(helper.createLabeledRoundButton("ПУСК", x, y, radius, function() {
			ui.onSpin();
		}));
    };
    // Обновляем количество монет
    this.updateCoinsLabel = function(amount) {
    	coinsLabel.text = amount ? amount : "0";
    	return this;
    };

    this.updateBetLabel = function(amount) {
    	betLabel.text = amount ? amount : "0";
    	return this;
    };
};
