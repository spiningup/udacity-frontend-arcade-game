// Enemies our player must avoid
var xstep = 101,
    ystep = 83,
    vstep = 50;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > xstep * 5) {
        this.x = 0;
    }
};

Enemy.prototype.reset = function() {
    this.x = xstep * getRandomInt(0, 5);
    this.y = ystep * getRandomInt(1, 4) - 20;
    this.speed = vstep * getRandomInt(1, 5);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.reset = function() {
    this.x = xstep * getRandomInt(1, 4);
    this.y = ystep * 5 - 10;
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.update(-1, 0);
    } else if (key === 'right') {
        this.update(1, 0);
    } else if (key === 'up') {
        this.update(0, -1);
    } else if (key == 'down') {
        this.update(0, 1);
    } else {
    }
};

Player.prototype.update = function(dx, dy) {
    this.x += xstep * dx;
    this.y += ystep * dy;

    if (this.x >= xstep * 5 || this.x < 0) {
      this.x -= xstep * dx;
    }

    if (this.y > ystep * 5) {
      this.y -= ystep * dy;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Gem = function() {
    images = ['images/Gem-Blue.png', 'images/Gem-Green.png', 'images/Gem-Orange.png'];
    this.sprite = images[getRandomInt(0, 3)];
    this.reset();
};

Gem.prototype.reset = function() {
    this.x = xstep * getRandomInt(0, 5);
    this.y = ystep * getRandomInt(1, 4) - 20;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Score = function() {
    this.num = 0;
    this.x = 10;
    this.y = 30;
};

Score.prototype.update = function(num) {
    this.num += num;
};

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

function resetObjects() {
    allEnemies = [];
    for (var i = 0; i < getRandomInt(2, 6); i++) {
        enemy = new Enemy();
        allEnemies.push(enemy);
    };

    allGems = [];
    for (var i = 0; i < getRandomInt(1, 4); i++) {
        gem = new Gem();
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
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
