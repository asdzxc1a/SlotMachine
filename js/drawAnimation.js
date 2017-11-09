//Создаем основу
function drawAnimation(totalReels) {
	const reels = [];
//Количество слотов в одном reel
	const totalSlotsInReel = 15;
//Основной background
	const backgroundImage = "img/blue-background.jpg";
//Длительность вращения слотов
	const spinDuration = 1000;
//Интервал перед останокой каждого слота
	const intervalBetweenSpinStop = 400;

	const gameResult = new Conclusion();

	var onSpinEnded;
	var isSpinning = false;

	var coinsInSpin;
//Создаем маску
	this.create = function() {
		setup(); 
		const mask = newMask();
		createSlotsCol(mask);
	};
//Запускаем reel 
	this.update = function() {
		$.each(reels, function(i, reel) {
			reel.spin();
		});
	};
//Создаем texture из пути background
	function setup() {
		var background = new PIXI.Sprite(PIXI.loader.resources[backgroundImage].texture);
		background.width = backgroundWidth;
		background.height = backgroundHeight;

		helper.addToScene(background);
	};
//Создаем маску для слотмашины
	function newMask() {
		var mask = helper.createSquare(0, 92, window.innerWidth, 433);
		helper.addToScene(mask);
		return mask;
	};
// Создаем маску для слотов
	function createSlotsCol(mask) {
		for (var i = 0; i < totalReels; i++) {
			var col = new Reel(totalSlotsInReel, i, mask);
			col.create();
			reels.push(col);
		}
	};

	this.spin = function(coins, callback) {
		if (isSpinning)
			return false;

		onSpinEnded = callback;
		coinsInSpin = coins;

		isSpinning = true;
		$.each(reels, function(i, reel) {
			reel.startSpinning();
		});

		setTimeout(function() { endSpin(); }, spinDuration);

		return true;
	};
//Создаем функцию для остановки вращения
	function endSpin() {
		$.each(reels, function(i, reel) {
			stopReelSpin(i, reel);
		});

		setTimeout(function() {
			isSpinning = false;

			calculateGameResult();
		}, (reels.length) * intervalBetweenSpinStop);
	};

	function stopReelSpin(index, reel) {
		setTimeout(function() {
			reel.endSpin();
		}, index * intervalBetweenSpinStop);
	};

	function calculateGameResult() {
		const resultReels = []
        $.each(reels, function(i, reel) {
            resultReels.push(reel.getResult());
        });

		onSpinEnded(gameResult.calculateResult(coinsInSpin, resultReels));
	};

	return this;
};
