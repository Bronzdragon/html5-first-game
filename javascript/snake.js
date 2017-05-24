var imageRepository = new function() {
	this.background = new Image();

	this.background.src = "../images/background.png";
}


/**
 * Creates the Drawable object, which will serve as the base
 * class for all drawable objects in the game.
 */

function Drawable() {
	this.init = function(x, y){
		this.x = x;
		this.y = y;
	}
	this.speed = 0;
	this.canvasWidth=0;
	this.canvasHeight=0;

	this.draw = function() {};
}


// Child of Drawable. This will pan, thus creating the illusion of movement
function Background() {
	this.speed = 1;

	this.draw = function() {  // implement the earlier absctract function
		this.y += this.speed;

		this.context.drawImage(imageRepository.background, this.x this.y);
		this.context.drawImage(imageRepository.background, this.x this.y - this.canvasHeight);
		if (this.y >= this.canvasHeight){
			this.y = 0;
		};
	}

}
Background.prototype = new Drawable();

