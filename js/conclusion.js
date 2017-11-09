// Создаем результат
function Conclusion() {

	this.calculateResult = function(coins, reels) {
		var score = 0;

		score += checkLines(reels);

		score += checkCols(reels);

		return score;
	};

	function checkLines(reels) {
		return 0;
	};

	function checkCols(reels) {
		return 0;
	};

};
