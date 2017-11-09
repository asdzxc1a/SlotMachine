
//Начало игры, основа программы
const helper = new Helper();
const draw = new Draw();
draw.init();

//Собираем главные элементы и устанавливаем правила
function Draw() {
    //Количество полос в слотмашине
	var totalSlots = 5; 
    //Создаем новую instance of machine
	var machine = new drawAnimation(totalSlots);
    
	var drawUi = new GameUi();
    
    //Количество доступных монет в начале игры
	var totalCoins = 1000;
    //Default ставка
	var bet = 20;
	const minBet = 20;
	const maxBet = 100;
	const deltaBet = 10;
    //Вращение делаем false по умолчанию
	var isSpinning = false;
    
	this.init = function() {
    // Загружаем изображения в PIXI
		PIXI.loader
			.add(helper.createSlotTypeFileNameArray(Slots))// Берем изображения из файла helper.js
			.add("img/blue-background.jpg")
			.load(ready);
    // добавляем the renderer view элемент в DOM
		document.body.appendChild(renderer.view);

		requestAnimationFrame(gameLoop);
	};
   //Создаем функцию для контроля вращения
	function spin() {
		if (isSpinning)
			return;

		if (totalCoins - bet < 0) {
			alert("У вас недостаточно средств!");
			return;
		}

		isSpinning = true;

		if (machine.spin(bet, spinResult)) {
			totalCoins -= bet;
			drawUi.updateCoinsLabel(totalCoins);
		}
	};
    //Создаем функцию результата
	function spinResult(result) {
		totalCoins += result;
		drawUi.updateCoinsLabel(totalCoins);

		isSpinning = false;
    };

    function gameLoop() {
    	requestAnimationFrame(gameLoop);
    	machine.update();
    	renderer.render(stage);
    };

    function ready() {
    	machine.create();
    	drawUi.create();
    	drawUi.onSpin = spin;
    	drawUi.onIncreaseCurrentBet = increaseCurrentBet;
    	drawUi.onDecreaseCurrentBet = decreaseCurrentBet;
    	drawUi.updateCoinsLabel(totalCoins).updateBetLabel(bet);
    };
    //Создаем функцию для увелечения ставки
    function increaseCurrentBet() {
    	if (isSpinning)
    		return;
    	
        if (bet + deltaBet > maxBet) {
        	alert("Вы уже поставили максимум.");
            return;
        }

		changeCurrentCoinsToSpin(deltaBet);
    };
    //Создаем функцию для уменьшения ставки
    function decreaseCurrentBet() {
    	if (isSpinning)
    		return;

        if (bet - deltaBet < minBet) {
        	alert("Вы уже поставили минимум.");
            return;
        }

		changeCurrentCoinsToSpin(deltaBet * -1);
    };
    
    function changeCurrentCoinsToSpin(delta) {
		bet += delta;
		drawUi.updateBetLabel(bet);
    };
};
