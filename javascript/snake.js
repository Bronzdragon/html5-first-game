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

	var segments = [];

	var temp;
	for(temp = 0; temp < 3; temp++){
		var segment = new SnakeSegment();
		segment.init(100, 100 + (temp * 25));
		segments.push(segment);
	}

	this.draw = function (){
		var counter;
		for(counter = 0; counter < segments.length; counter++){
			segments[counter].draw();
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
		this.context.fillRect(this.x + 1, this.y + 1, 23, 23);
	}
}
SnakeSegment.prototype = new Drawable();


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

