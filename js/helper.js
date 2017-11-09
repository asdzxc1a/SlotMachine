//Устанавливаем размер background
const backgroundWidth = window.innerWidth;
const backgroundHeight = window.innerHeight;
//Создаем общий container
const stage = new PIXI.Container(),
// Создаем render
    renderer = PIXI.autoDetectRenderer(backgroundWidth, backgroundHeight);
// Создаем переменные для слотов
const Slots = [
    "slot-ten",
    "slot-winner",
    "slot-pearl",
    "slot-q",
    "slot-nine",
    "slot-j",
    "slot-k",
    "slot-a",
    "slot-fish",
    "slot-str",
    "slot-jk",
    "slot-bg"
];
// 
function Helper() {
    this.addToScene = function(sprite) {
    	stage.addChild(sprite);
    };

    this.removeFromScene = function(sprite) {
    	stage.removeChild(sprite);
    };
//Создаем графику для прямоугольника
    this.createSquare = function(x, y, w, h) {
        var graphics = new PIXI.Graphics();
// Заполняем       
        graphics.beginFill();
//Рисуем прямоугольник        
        graphics.drawRect(x, y, w, h);
        graphics.endFill();
//Возвращаем прямоуголник
        return graphics;
    };

    this.parentCenter = function(child) {
        child.pivot = new PIXI.Point(child.width / 2, child.height / 2);
        return child;
    };
//Создаем графику для круга(тот же процесс что и для прямоугольника)
    this.createCircle = function(x, y, r) {
        var circle = new PIXI.Graphics();
        circle.beginFill("#000");
        circle.drawCircle(x, y, r);
        circle.endFill();

        return circle;
    };
// Установка слотов
	this.createSlotTypeFileNameArray = function(slotNameArray) {
		var fileNameArray = [];
		$.each(slotNameArray, function(i, name) {
			fileNameArray.push(helper.getSlotTypeFileName(name));
		});
		return fileNameArray;
	};

	this.getSlotTypeFileName = function(type) {
		return "img/" + type + ".jpg";
	};

    this.createLabeledRoundButton = function(label, x, y, r, callback) {
        const buttonLabel = new PIXI.Text(label, {font:"50px Arial", fill:"white"});
//Добавляем events
        const button = helper.createCircle(0, 0, r).setInteractive(true);
        button.position = { x: x, y: y };
        button.on('mouseup', callback);
        button.on('touchend', callback);
        button.addChild(buttonLabel);
        this.parentCenter(buttonLabel);

        return button;
    };
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
};

Array.prototype.last = function(){
    return this[this.length - 1];
};

PIXI.Graphics.prototype.setInteractive = function(val) {
    this.interactive = val;
    return this;
};
