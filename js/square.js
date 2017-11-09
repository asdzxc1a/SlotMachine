//Создаем слот
    function Square(slotType, mask) {
	this.type = slotType;
//Создаем путь для спрайта и его размер
	const spritePath = helper.getSlotTypeFileName(this.type);
	const spriteSize = 140;
//Создаем спрайт 
 	this.create = function() {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);
		this.sprite.width = spriteSize;
		this.sprite.height = spriteSize;
		this.sprite.mask = mask;
	};

 	return this;
};
