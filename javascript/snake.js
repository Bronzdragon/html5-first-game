/**********
 * The source code for my snake clone-, er, I mean, original game.
 * Author: Bronzdragon
 * Date: May 25th, 2017
 **********/


/**
 * Initialises/starts our game object
 */

var game = new Game();

function init(){
	if(game.init())
		game.start();
}


/**
 * Repository for all the images used in our game. Using a repository like this
 * means we only need to store each image once. Might not need this for Snake.
 */

var imageRepository = new function() {
	this.empty = null;

	this.background = new Image();
	this.background.src = "images/background.png";
}


/**
 * Creates the Drawable object, which will serve as the base class for all
 * drawable objects in the game.
 */

function Drawable() {
	this.init = function(x, y) {
		this.x = x;
		this.y = y;
	}
	this.canvasWidth = 0;
	this.canvasHeight = 0;

	this.draw = function() {};
}

 /**
 * The object that contains our here, Mr. Snake!
 */

function Snake() {
	this.speed = 1 * 1000; // time between updates in miliseconds

	this.direction = DirectionEnum.RIGHT;
	this.segments = [];

	this.lastMoved = Date.now();

	this.update = function (){
		if (Date.now() > this.lastMoved + this.speed){
			this.lastMoved = Date.now();
			this.move();
		} 
	};

	this.move = function (){
		switch (this.direction){ // Move the 'head' (IE, this class)
			case DirectionEnum.LEFT: // left
				this.x--;
				if (this.x < 0) this.x = game.grid.width;
				break;
			case DirectionEnum.DOWN: // down
				this.y--;
				if (this.y < 0) this.y = game.grid.height;
				break;
			case DirectionEnum.RIGHT: // right
				this.x++;
				if (this.x > game.grid.width) this.x = 0;
				break;
			case DirectionEnum.UP: // up
				this.y++;
				if (this.y > game.grid.height) this.y = 0;
				break;
			default:
				break;
		} // end switch

		// Start by clearing the last of the tail
		var tail = this.segments.shift();
		tail.clear();

		// Create a new head segment.
		var segment = new SnakeSegment();
		
		segment.init(this.x, this.y);
		segment.draw();
		this.segments.push(segment); //insert the new head.
	};

	this.draw = function (){ // redraw the whole snake.
		for(var counter = 0; counter < this.segments.length; counter++){
			this.segments[counter].draw();
		}
	};

	this.init = function(x, y){
		this.x = x; this.y = y;
		//this.prototype.init.call(x, y);
		//Drawable.init.call(this, x, y);

		// create three segments on spawn
		for(var temp = 0; temp < 3; temp++){
			var segment = new SnakeSegment();
			segment.init(1, 1 + temp);
			this.segments.push(segment);
		}
		for(var temp = 0; temp < 3; temp++){
			this.move();
		}
	}
}
Snake.prototype = new Drawable();


/**
 * A piece of the body of Mr. Snake.
 */

function SnakeSegment() {
	this.draw = function() {  // implement the earlier absctract function
		//this.context.rect(this.x, this.y, 25, 25);
		this.context.fillStyle="#FF0000";
		this.context.fillRect((this.x * game.grid.blockSize) + 1 , (this.y * game.grid.blockSize) + 1, game.grid.blockSize - 2, game.grid.blockSize - 2);
	}

	this.clear = function () {
		this.context.clearRect(this.x * game.grid.blockSize, this.y * game.grid.blockSize, game.grid.blockSize, game.grid.blockSize);
	}
}
SnakeSegment.prototype = new Drawable();

function Grid() {
	this.blockSize = 0; //25;
	this.width  = 0; //600 / this.blockSize;
	this.height = 0; //350 / this.blockSize;

	this.init = function(stage_width, stage_height, size) {
		this.width = stage_width/size;
		this.height = stage_height/size;
		this.blockSize = size;
	};
}


/**
 * Definition of our game object
 */
function Game() {
	// See if the canvas object is supported
	this.init = function(){
		this.bgCanvas = document.getElementById('background');
		this.playArea = document.getElementById('playarea');

		if (this.bgCanvas.getContext){
			this.bgContext = this.bgCanvas.getContext('2d');
		
			Snake.prototype.context = this.playArea.getContext('2d');
			Snake.prototype.canvasWidth = this.playArea.width;
			Snake.prototype.canvasHeight = this.playArea.height;

			SnakeSegment.prototype.context = this.playArea.getContext('2d');
			SnakeSegment.prototype.canvasWidth = this.playArea.width;
			SnakeSegment.prototype.canvasHeight = this.playArea.height;

			this.grid = new Grid();
			this.grid.init(this.playArea.width, this.playArea.height, 25);

			this.snake = new Snake();
			this.snake.init(1, 1);

			return true;
		} else { return false; }
	};

	this.start = function () {
		// Set the background once:
		this.bgContext.drawImage(imageRepository.background, 0, 0);

		// Main animation/fucntion loop. It'll request a call-back of itself
		animate();
	};
}

/**
 * The actual game loop. Requests that this function is called back when the
 * next frame should be called back next frame.
 */
function animate() {
	requestAnimFrame(animate); 

	// animate/update the 
	game.snake.update();
	game.snake.draw();
}

/**
 * Keyboard input handeling goes here.
 */
window.addEventListener("keydown", function (event) {
	switch (event.key) {
		case "ArrowDown":
			break;
		case "ArrowUp":
			break;
		case "ArrowLeft":
			break;
		case "ArrowRight":
			break;
		default:
			return;
	}
	
	event.preventDefault();
}, true);

var DirectionEnum = {
	DOWN: "down",
	UP: "up",
	LEFT: "left",
	RIGHT: "right"
};

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
			};
})();

