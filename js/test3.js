var width = 1000,
	height = 600,
	canvas = document.getElementById('canvas'),
	context = document.getElementsByTagName('canvas')[0].getContext('2d'),

	points = 0,
    state = 2,
    
	background = 'white', // Edit 
    gameRunning;
    
    
    deatSnd = new Audio("sound/0477.mp3")
	
canvas.width = width;
canvas.height = height;


//Simplify
var clear = function(){
	context.fillStyle = background; // Edit
	context.beginPath();
	context.rect(0,0, width, height);
	context.closePath();
	context.fill();
};

//Change to class poss
var player = new (function(){
	
	
	this.width = 40;
	this.height = 70;
	
	this.X = 0;
	this.Y = 0;
	
	this.isJumping = 0;
	this.isFalling = 0;
	
	this.jumpSpeed = 0;
	this.fallSpeed = 0;

    this.isMoving = true;
    
    var platformCaller = this;
	
	this.setPosition = function(x, y){
		this.X = x;
		this.Y = y;
	}
	
	//Constant jump
	this.jump = function() {
		if(!this.isFalling) {
			this.isJumping = true;
			this.jumpSpeed = 22;

		}
	}
    
    //High priority function
	this.checkJump = function() {
		if(this.Y > height * 0.25) {
			this.setPosition(this.X, this.Y - this.jumpSpeed);
		} else {
			if(this.jumpSpeed > 10) //points += 100; //revisit
			
			platforms.forEach(function(platform, ind) {
				platform.Y += platformCaller.jumpSpeed; //Breaker
				
				if(platform.Y > height) {
					platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.Y - height);
				}
			});
		}
		
		this.jumpSpeed--;
		if(this.jumpSpeed == 0) {
			this.isFalling = true;
		}
	}
	
	this.checkFall = function() {
		if(this.Y < height - this.height) {
			this.setPosition(this.X, this.Y + this.fallSpeed);
			this.fallSpeed++;
		} else{
                deatSnd.play();
                alert("game over") //Edited      
		    }
	}
	
	this.fallStop = function() {
		this.isFalling = false;
		this.fallSpeed = 0;
		this.jump();
	}
		
	
	this.moveLeft = function(theX) {
		if((this.X > 0) && this.isMoving) {
			this.setPosition(theX - this.width/2, this.Y);
		}
	}
	
	this.moveRight = function(theX) {
		if((this.X + this.width < width) && this.isMoving) {
			this.setPosition(theX - this.width/2, this.Y);
		}
	}
	
	this.update = function() {
		if(this.isJumping) this.checkJump();
		if(this.isFalling) this.checkFall();
		this.draw();
	}
		
	
	this.draw = function(){

			context.fillRect(this.X, this.Y, this.width, this.height);

	}
})();

var Platform = function(x, y) {
	
	this.onCollide = function() {
		player.fallStop();
	}
	
	
	this.draw = function() {
		context.fillStyle = 'black';
		context.fillRect(this.X, this.Y, platformWidth, platformHeight);
	}
	
	
	this.X = x;
	this.Y = y;
	
	return this;
};

var nrOfPlatforms = 5,
	platforms = [],
	platformWidth = 100;
	platformHeight = 20;

var generatePlatforms = function() {
	var position = 0
	
	for(var i = 0; i < nrOfPlatforms; i++) {
		
		platforms[i] = new Platform(Math.random()*(width-platformWidth), position);
		
		if(position < height - platformHeight) position += (height / nrOfPlatforms);
	}
}();

var checkCollision = function() {
	platforms.forEach(function(e) {
		if((player.isFalling) &&
           (player.X < e.X + platformWidth) &&
           //(player.X > e.X + platformWidth) &&
           //(player.Y + player.height < e.Y) &&
           (player.Y + player.height > e.Y) &&
           (player.X > e.X)&&
           //(player.Y + player.height < e.Y + platformHeight) &&
           (player.Y + player.height > e.Y + platformHeight)
		  ) {
			e.onCollide();
		}
	})
}

//Simplify
document.onmousemove = function(e) {
	if(state == 1) {
		if(player.X + canvas.offsetLeft > e.pageX - 20) {
			player.moveLeft(e.pageX - canvas.offsetLeft);
		} else if(player.X + canvas.offsetLeft < e.pageX - 20) {
			player.moveRight(e.pageX - canvas.offsetLeft);
		}
	}
};


document.onmousedown = function(e) {
	if(state == 0) {
		state = 2;
	}
	 if(state == 2) {
		state = 1;
	}
}

player.setPosition(((width - player.width) / 2), ((height - player.height) / 2));
player.jump();

var GameLoop = function() {
	clear();
	
	platforms.forEach(function(platform){
		platform.draw();
	});
	
	checkCollision();
	
	player.update();
	if(state){
		gameRunning = setTimeout(GameLoop, 1000 / 50);
	}
}

var StartMenu = function() {
	clear();
	
	context.font = "20pt Arial";
	context.fillStyle = "Black";
	context.fillText("Click to play", width / 2 - 150, height / 2 - 50);
	
	if(state == 2){
        gameRunning = setTimeout(StartMenu, 1000 / 50); 
    }else {
		clearTimeout();
		GameLoop();
	}
}

StartMenu();