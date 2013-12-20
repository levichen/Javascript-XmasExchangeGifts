
function ExchangeGraph(containerName, width, height) {
	this.container 			= document.getElementById(containerName);
	this.container.width 	= width;
	this.container.height 	= height;

	this.participants 		= [];
	this.itemPosition 		= [];

	this.itemMargin 		= 10;
	this.itemWidth 			= 0;
	this.itemHeight 		= 150;
	this.giftPicXPostion 	= height - this.itemHeight;
};

ExchangeGraph.prototype.initView = function(data) {
	this.participants = data;
	this.itemWidth = Math.ceil(this.container.width / this.participants.length) - this.itemMargin;

	this.calculateXPosition();
	this.drawHeadPic();
	this.drawGiftPic();
};

ExchangeGraph.prototype.calculateXPosition = function() {
	for (var i = 0, currentX = 0; i < this.participants.length; i++) {
		this.itemPosition.push(currentX);
		currentX += this.itemWidth + this.itemMargin;
	}
};

ExchangeGraph.prototype.drawHeadPic = function() {	
	var context = this.container.getContext('2d');

	for (var i = 0; i < this.participants.length; i++) {
		var image = new Image();
		image.onload = (function(xPosition, yPosition, width, height, image) {
			return function() {
				context.drawImage(image, xPosition, yPosition, width, height);	
			};			
		})(this.itemPosition[i], 0, this.itemWidth, this.itemHeight, image);
		image.src = this.participants[i].headicon;
	}
};

ExchangeGraph.prototype.drawGiftPic = function() {
	var context 	= this.container.getContext('2d'),
		rectHeight 	= 22;

	for (var i = 0; i < this.participants.length; i++) {
		var image = new Image();
		image.onload = (function(xPosition, yPosition, width, height, name, image) {
			return function() {
				context.drawImage(image, xPosition, yPosition, width, height);	

				context.beginPath();
				context.rect(xPosition, yPosition + (height - rectHeight), width, rectHeight);				
				context.fillStyle = '#000000';
				context.globalAlpha = 0.5; 
				context.fill();

				context.globalAlpha = 1;
				context.font = '25px Arial';
				context.fillStyle = '#FFFFFF';
				context.fillText(name, xPosition, yPosition + height);
			};			
		})(this.itemPosition[i], this.giftPicXPostion, this.itemWidth, this.itemHeight, this.participants[i].name, image);
		image.src = this.participants[i].gift;
	}
};

ExchangeGraph.prototype.drawLine = function(lotteryResult) {
	var context = this.container.getContext('2d'),
		offsetX = Math.ceil(this.itemWidth / 2);

	for (var index in lotteryResult) {
		context.beginPath();
		context.moveTo(
			this.itemPosition[index] + offsetX, 
			this.itemHeight
		);
		context.lineTo(
			this.itemPosition[lotteryResult[index]] + offsetX, 
			this.giftPicXPostion
		);
		context.stroke();
	}
};
