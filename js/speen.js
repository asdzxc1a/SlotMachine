// Создаем функцию
function Reel(totalSlots, colId, mask) {

	this.id = colId;
	
	var isSpinning = false;

	const slots = [];
	var positionY = 0;
//Задаем позицию слотмашины по оси Х
	const deltaPosX = 158;
	const anchorPosX = 135 + (this.id * deltaPosX);
//Задаем позицию слотмашины по оси Y
	const deltaPosY = 150;
	const anchorPosY = -50;
//Анимация и скорость вращения
	var spinSpeed = 0;
	const maxSpinSpeed = 55;
	const animationSpeed = 400;
//Добавляем новую функцию через прототип 
	Reel.prototype.create = function() {
		const insertedTypes = [];
		for(var i = 0; i < totalSlots; i++) {
			var pos = 0;
//Задаем рендомное значение
			do {
				pos = Math.floor(Math.random() * Slots.length);
				if (i >= Slots.length)
					break;
			} while (insertedTypes.contains(pos));			
			insertedTypes.push(pos);
//Создаем new instance функции слота
			var slot = new Square(Slots[pos], mask);
			slot.create();
			slots.push(slot);
			
			helper.addToScene(slot.sprite);
		}

		positionSlotsInCol();
	};
// Создаем для позиции слота
	function positionSlotsInCol() {
		$.each(slots, function(i, slot) {
			slot.sprite.position.x = anchorPosX;
			slot.sprite.position.y = positionY + anchorPosY + (i * deltaPosY);
		});
	};

	this.spin = function() {
		if (!isSpinning)
			return;

		moveSlotsWithSpeed(spinSpeed);
	};

	this.startSpinning = function() {
		isSpinning = true;

		$({ speed: 0 }).animate({ speed: maxSpinSpeed }, {
			duration: animationSpeed,
			step: function(now) {
				spinSpeed = now;
			}
		});
	};
// Создаем функцию скоростии слотов
	function moveSlotsWithSpeed(speed) {
		$.each(slots, function(i, slot) {
			slot.sprite.position.y += speed;
		});

		positionY += speed;

		if (positionY >= deltaPosY)
			resetColPosition();
	};
//Создаем функцию для reset позиции
	function resetColPosition() {
		var lastSlot = slots.last();
		slots.pop(lastSlot);

		slots.splice(0, 0, lastSlot);

		positionY -= deltaPosY;
		lastSlot.sprite.position.y = slots[1].sprite.position.y - deltaPosY;
	};
//Задаем конец вращения
	this.endSpin = function() {
		isSpinning = false;

		var ss = spinSpeed;
		$({ speed: animationSpeed }).animate({ speed: ss }, {
			duration: 0,
			step: function(now) {
				moveSlotsWithSpeed(ss - now);
			},
			complete: function() { endSpinAnimation(); }
		});
	};
//Создаем функцию для остановки анимации
	function endSpinAnimation() {
		const startPos = positionY;
		const endPos = positionY > deltaPosY / 2 ? deltaPosY : 0;

		$({ y: startPos }).animate({ y: endPos }, {
			duration: 500,
			easing: "easeOutBack",
			step: function(now) {
				positionY = Math.round(now);
				positionSlotsInCol();
			}
		});
	};
//Получаем результат
	this.getResult = function() {
		const result = [];

		for (var i = 1; i <= 3; i++)
			result.push(slots[i]);

		return result;
	};

	return this;
};

