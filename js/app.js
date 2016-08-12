"use strict";

// Define the size of each block in terms of px and the speed unit.
var XSTEP = 101,
    YSTEP = 83,
    VSTEP = 50;

// Define playerImages and gemImages
var playerImages = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'];

var gemImages = ['images/Gem-Blue.png',
                 'images/Gem-Green.png',
                 'images/Gem-Orange.png'];

// Superclass for Enemy, Player and Gem
var Obj = function() {
};

// Function to generate a random integer between min and max value
Obj.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

// Function to reset locations
Obj.prototype.reset = function() {
    this.x = XSTEP * this.getRandomInt(0, 5);
    this.y = YSTEP * this.getRandomInt(1, 4) - 20;
};

// Function to display image given x, y, and image src (this.sprite)
Obj.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy class
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Enemy inherite Obj superclass
Enemy.prototype = Object.create(Obj.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > XSTEP * 5) {
        this.x = 0;
    }
};

// Reset enemy's position and speed in a random way
Enemy.prototype.reset = function() {
    this.x = XSTEP * this.getRandomInt(0, 5);
    this.y = YSTEP * this.getRandomInt(1, 4) - 20;
    this.speed = VSTEP * this.getRandomInt(1, 5);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function() {
    // spriteidx to keep track of the player avatar to display,
    // by pressing 'enter' key, avatar will change
    this.spriteidx = 0;
    this.sprite = playerImages[this.spriteidx];
    this.reset();
};

// Player inherite Obj superclass
Player.prototype = Object.create(Obj.prototype);
Player.prototype.constructor = Player;

// Reset player position upon winning or losing the game
Player.prototype.reset = function() {
    this.x = XSTEP * this.getRandomInt(1, 4);
    this.y = YSTEP * 5 - 10;
};

// Handle keyboard input to move player
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.update(-1, 0);
    } else if (key === 'right') {
        this.update(1, 0);
    } else if (key === 'up') {
        this.update(0, -1);
    } else if (key == 'down') {
        this.update(0, 1);
    } else if (key == 'enter') {
        this.spriteidx += 1;
        if (this.spriteidx > 4) {
            this.spriteidx = 0
        }
        this.sprite = playerImages[this.spriteidx];
    }
};

// Update player position
Player.prototype.update = function(dx, dy) {
    this.x += XSTEP * dx;
    this.y += YSTEP * dy;

    // Make sure that player can't move beyond canvas
    if (this.x >= XSTEP * 5 || this.x < 0) {
      this.x -= XSTEP * dx;
    }

    if (this.y > YSTEP * 5) {
      this.y -= YSTEP * dy;
    }
};

// Gem class
var Gem = function() {
    this.sprite = gemImages[this.getRandomInt(0, 3)];
    this.reset();
};

// Gem inherite Obj superclass
Gem.prototype = Object.create(Obj.prototype);
Gem.prototype.constructor = Gem;

// Score class - display and update game score
var Score = function() {
    this.num = 0;
    this.x = 10;
    this.y = 30;
};

// Update score
Score.prototype.update = function(num) {
    this.num += num;
};

// Display score on canvas
Score.prototype.render = function() {
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.clearRect(0, 0, 200, 50);
    ctx.fillText('Score : ' + this.num, this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var allGems = [];
var player = new Player();
var score = new Score();

// Generate random number of enemies and gems
function resetObjects() {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
    };

    allEnemies = [];
    for (var i = 0; i < getRandomInt(2, 6); i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    };

    allGems = [];
    for (var i = 0; i < getRandomInt(1, 4); i++) {
        var gem = new Gem();
        allGems.push(gem);
    };
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
