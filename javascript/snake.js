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
 * means we only need to store each image once.
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
 * Child of Drawable. This will pan, thus creating the illusion of movement
 */



// Set our back-ground object to inherit from drawable.
function Background() {
	this.speed = 1.5;

	this.draw = function() {  // implement the earlier absctract function
		// Pan background
		this.y += this.speed;

		this.context.drawImage(imageRepository.background, this.x, this.y);
		// Draw a duplicate, so that if the previous image scrolls too
		// far, we can still see the background.
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}
Background.prototype = new Drawable();


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

	/*this.segments = [
		new SnakeSegment(100, 100),
		new SnakeSegment(100, 125), 
		new SnakeSegment(100, 150),
	];*/

	/*this.init = function(){
		this.prototype.init();
	}*/
	this.draw = function (){
		var counter;
		for(counter = 0; counter < segments.length; counter++){
			segments[counter].draw();
			// TODO: Figure out why this function isn't called.
		}
	}
}
Snake.prototype = new Drawable();


/**
 * A piece of the body of Mr. Snake.
 */

function SnakeSegment() {
	// TODO:fill this function
	
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

			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

			this.background = new Background();
			this.background.init(0,0);
		
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
		animate();
	};
}


/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */

function animate() {
	requestAnimFrame(animate);
	game.background.draw();
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

