//===Global variables===
var width = 1000
var	height = 600
var	canvas = document.getElementById('canvas')
var	context = document.getElementsByTagName('canvas')[0].getContext('2d')

var	points = 0
var gameState = "mainMenu"
    
var	background = 'lightblue'
var gameRunning;
var gameLost = false;

var nrOfPlatforms = 4;
var	platforms = [];
var	platformWidth = 80;
var platformHeight = 5;
    
    
var deatSnd = new Audio("../sounds/0477.mp3")
var jumpSnd = new Audio("../sounds/bounce.mp3")

title = new Image();
title.src = "../img/jump.png";

playerImg = new Image();
playerImg.src = "../img/pogo.png"

	
canvas.width = width;
canvas.height = height;


//Clears canvas
var clear = function(){
	context.fillStyle = background;
	context.beginPath();
	context.rect(0,0, width, height);
	context.closePath();
	context.fill();
};


//===Player class===
var player = new (function(){
	
	
	this.width = 70;
    this.height = 80;
    
    this.imgHeight = 126;
	
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
    
    //Checks to see if player is jumping
	this.checkJump = function() {
		if(this.Y > height * 0.30) {
			this.setPosition(this.X, this.Y - this.jumpSpeed);
		} else {
			if(this.jumpSpeed > 10)
			
			platforms.forEach(function(platform, i) {
				platform.Y += platformCaller.jumpSpeed;
				
				if(platform.Y > height) {
                    platforms[i] = new Platform(Math.random() * width, platform.Y - height);
                    points ++;
				}
			});
		}
		
		this.jumpSpeed--;
		if(this.jumpSpeed == 0) {
			this.falling = true;
		}
	}
	//Checks to see if player is falling
	this.checkFall = function() {
		if(this.Y < height - this.height) {
			this.setPosition(this.X, this.Y + this.fallSpeed);
			this.fallSpeed++;
		} else{
                deatSnd.play(); 
                gameSt("gameover")
		    }
	}
    
    //Jumps on impact of platforms
	this.stopFall = function() {
		this.falling = false;
		this.fallSpeed = 10;
		this.jump();
	}
		
	//Movement of player
	this.moveLeft = function(mouseX) {
		if((this.X > 0) && this.isMoving) {
			this.setPosition(mouseX - this.width/2, this.Y);
		}
	}
	
	this.moveRight = function(mouseX) {
		if((this.X + this.width < width) && this.isMoving) {
            this.setPosition(mouseX - this.width/2, this.Y);
            

                playerImg.src = "../img/pogoR.png"
		}
	}
    
    //Updates animation of player
	this.update = function() {
		if(this.jumping) this.checkJump();
		if(this.falling) this.checkFall();
		this.draw();
	}
		
	//Draws player on screen
	this.draw = function(){
        context.drawImage(playerImg, this.X, this.Y, this.width, this.height)

	}
})();


//===Platform class===
var Platform = function(x, y) {

	//Calls to stopFall function in player class
	this.onCollide = function() {
        player.stopFall();
        
	}
	
	//Draws platforms on screen
	this.draw = function() {
		context.fillStyle = 'darkred';
		context.fillRect(this.X, this.Y, platformWidth, platformHeight);
	}
	
	//Alters platform position
	this.X = x + 10;
	this.Y = y + 50;
	
	return this;
};

//Generates platforms
var generatePlatforms = function() {

    //Sets Y position to top of canvas
	var position = 0;
	
	for(var i = 0; i < nrOfPlatforms; i++) {
		
		platforms[i] = new Platform(Math.random()*(width-platformWidth), position);
		
        if(position < height - platformHeight) position += (height / nrOfPlatforms);
        
	}
}();


//Collision detection
var checkCollision = function() {
	platforms.forEach(function(e) {
        if((player.falling)&&(player.X + player.width > e.X)&&
        (player.Y + player.height > e.Y)&&(player.X < e.X + platformWidth)
		  ){
			e.onCollide();
		}
	})
}

//Detects mouse movement
document.onmousemove = function(e) {
	if(gameState == "game") {
		if(player.X - 10) {
			player.moveLeft(e.pageX);
		} else if(player.X - 10) {
            playerImg.src = "../img/pogoR.png"
            player.moveRight(e.pageX);
            playerImg.src = "../img/pogoR.png"
		}
	}
};

//Provides click detection for starting game
document.onmousedown = function() {
	if(gameState == "mainMenu") {
        gameState = "game";
       
    }else if(gameState == false){
        gameState = "mainMenu";
    }
   
}

//Sets initial player position and jump function
player.setPosition(((width - player.width) / 2), ((height - player.height) / 2));
player.jump();


//==Main game is played===
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


//===Opening menu===
var StartMenu = function() {
    clear();

    

    context.drawImage(title, width/ 2 - 240, (height/ 2) - 250)
	
	context.font = "30pt sans-serif";
	context.fillStyle = "darkblue";
    context.fillText("Click anywhere to play", width / 2 - 210, (height / 2) - -60);
    
    context.font = "20pt Arial";
	context.fillStyle = "black";
    context.fillText("Press 'I' for instructions", width / 2 - 150, (height / 2) - -250);
	
	if(gameState == "mainMenu"){
        gameRunning = setTimeout(StartMenu, 1000 / 50); 
    }else {
		clearTimeout();
		gameLoop();
    }
    
    document.addEventListener('keydown', function(){
        var key_press = String.fromCharCode(event.keyCode);
        if(key_press == "I"){
            instMenu()
        }
    })
}

//===Game over screen===
var gameOver = function() {
	
     gameState = false;
     clearTimeout(gameLoop);
     gameLost = true;

    setTimeout(function() {
        	clear();
        	context.fillStyle = "Red";
        	context.font = "30pt Arial";
            context.fillText("GAME OVER!", width / 2 - 150, height / 2 - 80);

            context.font = "20pt Arial"
            context.fillStyle = "green"
            context.fillText("YOU SCORED: " + points + " POINTS", width / 2 - 185, height / 2 - 35);

            context.font = "15pt Arial"
            context.fillStyle = "Black"
            context.fillText("Press spacebar to restart",width / 2 - 140, height / 2 )

            document.addEventListener('keydown', function(e){
                var key_press = String.fromCharCode(event.keyCode);
                if(key_press == " "){
                    clear()
                    location.reload(); 
                }
            })
    
        }, 100);
    
    
}

//===Changes game state===
var gameSt = function(state){
    if(state == "mainMenu"){
        clear();
        StartMenu();
    }else if(state == "gameover"){
        clear();
        gameOver();
    }

}

//===Displays game information===
var instMenu = function(){
    clear()
    gameState = false;

    context.font = "30pt Chalkduster"
    context.fillStyle = "Black"
    context.fillText("Welcome to Jump!",width / 2 - 200, (height / 2) - 200)

    context.font = "20pt Arial"
    context.fillStyle = "Black"
    context.fillText("1. Use the mouse to move left and right",width / 2 - 270, (height / 2) - 100)

    context.font = "20pt Arial"
    context.fillStyle = "Black"
    context.fillText("2. Jump from platform to platform to gain points",width / 2 - 270, (height / 2) - 50)

    context.font = "20pt Arial"
    context.fillStyle = "Black"
    context.fillText("3. Don't look down!",width / 2 - 270, (height / 2) - 0)


    context.font = "15pt Arial"
    context.fillStyle = "Black"
    context.fillText("Press spacebar to go back",width / 2 - 140, (height / 2) - -200)

    document.addEventListener('keydown', function(e){
        var key_press = String.fromCharCode(event.keyCode);
        if(key_press == " "){
            clear()
            location.reload(); 
        }
    })


}

//===Initiates game===
gameSt(gameState);