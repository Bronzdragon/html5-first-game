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
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;

	this.draw = function() {};
}

 /**
 * The object that contains our here, Mr. Snake!
 */

function Snake() {
	this.speed = 1;

	this.direction = 3; // 1 = left; 2 = up; 3 = right; 4 = down;
	this.segments = [];

	// create three segments on spawn
	for(var temp = 0; temp < 3; temp++){
		var segment = new SnakeSegment();
		segment.init(1, 1 + temp);
		this.segments.push(segment);
	}

	this.move = function (){

		// Start by clearing the last of the tail
		var tail = segments.pop();
		this.context.clearRect(tail.x, tail.y, this.grid.width, this.grid.height);

		// Create a new head segment.
		var segment = new SnakeSegment();
		switch (direction){
			case 1: // left
				break;
			case 2: // up
				break;
			case 3: // right
				break;
			case 4: // down
				break;
		}
		
	}

	this.draw = function (){
		for(var counter = 0; counter < this.segments.length; counter++){
			this.segments[counter].draw();
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
}
SnakeSegment.prototype = new Drawable();

function Grid() {
	this.blockSize = 25;
	this.height = 350 / this.blockSize;
	this.width = 600 / this.blockSize;
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

			this.snake = new Snake();
			this.snake.init(50,50);
			return true;

		} else { return false; }
	};

	this.start = function () {
		//set the back-ground once:
		this.bgContext.drawImage(imageRepository.background, 0, 0);


		animate();
	};
}

// the actual game loop. 
function animate() {
	// Requests that this function is called back when the next frame should be drawn
	requestAnimFrame(animate); 


	// draw the snake.
	game.snake.draw();
}


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

