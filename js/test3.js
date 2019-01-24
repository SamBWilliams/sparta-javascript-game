var width = 1000
var	height = 600
var	canvas = document.getElementById('canvas')
var	context = document.getElementsByTagName('canvas')[0].getContext('2d')

var	points = 0
var gameState = "mainMenu"
    
var	background = 'white' // Edit 
var gameRunning;
    
    
var deatSnd = new Audio("sounds/0477.mp3")
var jumpSnd = new Audio("sounds/bounce.mp3")
	
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
	
	
	this.width = 20;
	this.height = 30;
	
	this.X = 0;
	this.Y = 0;
	
	this.jumping = 0;
	this.falling = 0;
	
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
		if(!this.falling) {
			this.jumping = true;
            this.jumpSpeed = 22;
            jumpSnd.play();
		}
	}
    
    //High priority function
	this.checkJump = function() {
		if(this.Y > height * 0.25) {
			this.setPosition(this.X, this.Y - this.jumpSpeed);
		} else {
			if(this.jumpSpeed > 10) //revisit
			
			platforms.forEach(function(platform, ind) {
				platform.Y += platformCaller.jumpSpeed; //Breaker
				
				if(platform.Y > height) {
                    platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.Y - height);
                    points ++;
				}
			});
		}
		
		this.jumpSpeed--;
		if(this.jumpSpeed == 0) {
			this.falling = true;
		}
	}
	
	this.checkFall = function() {
		if(this.Y < height - this.height) {
			this.setPosition(this.X, this.Y + this.fallSpeed);
			this.fallSpeed++;
		} else{
                deatSnd.play();
                // gameState == 2;
                // StartMenu();
                //alert("game over") //Edited   
                gameOver(); 
               // StartMenu();  
		    }
	}
	
	this.fallStop = function() {
		this.falling = false;
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
		if(this.jumping) this.checkJump();
		if(this.falling) this.checkFall();
		this.draw();
	}
		
	
	this.draw = function(){

        context.fillStyle = "red";
        context.fillRect(this.X, this.Y, this.width, this.height);
        

	}
})();

var Platform = function(x, y) {
	
	this.onCollide = function() {
        player.fallStop();
        // jumpSnd.play();
	}
	
	
	this.draw = function() {
		context.fillStyle = 'black';
		context.fillRect(this.X, this.Y, platformWidth, platformHeight);
	}
	
	
	this.X = x;
	this.Y = y;
	
	return this;
};

var nrOfPlatforms = 10,
	platforms = [],
	platformWidth = 50;
    platformHeight = 10;
    
    // if(points > 20){
    //     nrOfPlatforms === 2;
    // }

var generatePlatforms = function() {
	var position = 0
	
	for(var i = 0; i < nrOfPlatforms; i++) {
		
		platforms[i] = new Platform(Math.random()*(width-platformWidth), position);
		
		if(position < height - platformHeight) position += (height / nrOfPlatforms);
	}
}();

var checkCollision = function() {
	platforms.forEach(function(e) {
        if((player.falling) &&(player.X < e.X + platformWidth) &&(player.Y + player.height > e.Y) &&(player.X > e.X)&&
        (player.Y + player.height > e.Y + platformHeight)
		  ){
			e.onCollide();
		}
	})
}

//Simplify
document.onmousemove = function(e) {
	if(gameState == "game") {
		if(player.X - 20) {
			player.moveLeft(e.pageX);
		} else if(player.X - 20) {
			player.moveRight(e.pageX);
		}
	}
};


document.onmousedown = function() {
	if(gameState) {
		gameState = "game";
	}
}

// player.setPosition(((width - player.width) / 2), ((height - player.height) / 2));
player.setPosition(((width - player.width) / 2), ((height - player.height) / 2));
player.jump();

var gameLoop = function() {
	clear();
	
	platforms.forEach(function(platform){
		platform.draw();
	});
	
	checkCollision();
	
	player.update();
	if(gameState){
		gameRunning = setTimeout(gameLoop, 1000 / 50);
    }
    
    context.font = "20pt Arial";
	context.fillStyle = "Black";
	context.fillText("Points: " + points, width / 2 - 500, height / 2 - 250);
}

var StartMenu = function() {
    clear();
	
	context.font = "20pt Arial";
	context.fillStyle = "Black";
	context.fillText("Click to play", width / 2 - 150, height / 2 - 50);
	
	if(gameState == "mainMenu"){
        gameRunning = setTimeout(StartMenu, 1000 / 50); 
    }else {
		clearTimeout();
		gameLoop();
	}
}

var gameOver = function() {
	gameState = false;
	clearTimeout(gameLoop);
	setTimeout(function() {
		clear();
		context.fillStyle = "Black";
		context.font = "20pt Arial";
		
		context.fillText("GAME OVER!", width / 2 - 120, height / 2 - 40);
		context.fillText("YOU SCORED: " + points + " POINTS", width / 2 - 180, height / 2 - 10);
	}, 100);
}

StartMenu();