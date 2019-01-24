var width = 1000
var	height = 600
var	canvas = document.getElementById('canvas')
var	context = document.getElementsByTagName('canvas')[0].getContext('2d')

var	points = 0
var gameState = "mainMenu"
    
var	background = 'white' // Edit 
var gameRunning;
var gameLost = false;
    
    
var deatSnd = new Audio("sounds/0477.mp3")
var jumpSnd = new Audio("sounds/bounce.mp3")

title = new Image();
title.src = "../img/jump.png";

playerImg = new Image();
playerImg.src = "../img/pogo.png"
	
canvas.width = width;
canvas.height = height;



var clear = function(){
	context.fillStyle = background; // Edit
	context.beginPath();
	context.rect(0,0, width, height);
	context.closePath();
	context.fill();
};

//Change to class poss
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
            this.jumpSpeed = 28;
            jumpSnd.play();
		}
	}
    
    
	this.checkJump = function() {
		if(this.Y > height * 0.30) {
			this.setPosition(this.X, this.Y - this.jumpSpeed);
		} else {
			if(this.jumpSpeed > 10) //revisit
			
			platforms.forEach(function(platform, ind) {
				platform.Y += platformCaller.jumpSpeed;
				
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
               // gameOver(); 
               // StartMenu(); 
            //    gameState == "gameover" 
                gameSt("gameover")
		    }
	}
	
	this.stopFall = function() {
		this.falling = false;
		this.fallSpeed = 10;
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

        // context.fillStyle = "red";
        // context.fillRect(this.X, this.Y, this.width, this.height);
        context.drawImage(playerImg, this.X, this.Y, this.width, this.height)

	}
})();

var Platform = function(x, y) {
	
	this.onCollide = function() {
        player.stopFall();
        
	}
	
	
	this.draw = function() {
		context.fillStyle = 'darkblue';
		context.fillRect(this.X, this.Y, platformWidth, platformHeight);
	}
	
	
	this.X = x;
	this.Y = y;
	
	return this;
};

var nrOfPlatforms = 5,
	platforms = [],
	platformWidth = 80;
    platformHeight = 10;
    
    // if(points > 20){
    //     nrOfPlatforms === 2;
    // }

var generatePlatforms = function() {
	var position = 0;
	
	for(var i = 0; i < nrOfPlatforms; i++) {
		
		platforms[i] = new Platform(Math.random()*(width-platformWidth), position);
		
		if(position < height - platformHeight) position += (height / nrOfPlatforms);
	}
}();

var checkCollision = function() {
	platforms.forEach(function(e) {
        if((player.falling) &&(player.X < e.X + platformWidth)&&(player.X + player.width > e.X)&&
        (player.Y + player.height > e.Y)
		  ){
			e.onCollide();
		}
	})
}


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
	if(gameState == "mainMenu") {
        gameState = "game";
       // gameLost = false;
    }else if(gameState == false){
        gameState = "mainMenu";
    }
   // gameState == "game"
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

    // context.font = "50pt Arial";
    // context.fillStyle = "Black";
    // context.fillText("Title", width/ 2 - 100, height/ 2 - 0);

    context.drawImage(title, width/ 2 - 240, (height/ 2) - 250)
	
	context.font = "30pt Arial";
	context.fillStyle = "green";
	context.fillText("Click to play", width / 2 - 120, (height / 2) - -250);
	
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
     gameLost = true;

    setTimeout(function() {
        	clear();
        	context.fillStyle = "Red";
        	context.font = "30pt Arial";
            context.fillText("GAME OVER!", width / 2 - 150, height / 2 - 80);

            context.font = "20pt Arial"
            context.fillStyle = "Green"
            context.fillText("YOU SCORED: " + points + " POINTS", width / 2 - 180, height / 2 - 50);

            context.font = "15pt Arial"
            context.fillStyle = "Black"
            context.fillText("Press spacebar to restart",width / 2 - 140, height / 2)

            document.addEventListener('keydown', function(e){
                var key_press = String.fromCharCode(event.keyCode);
            
                if(key_press == " "){
                    clear()
                    location.reload();
                   
                }
            })
    
        }, 100);
    
    
}

var gameSt = function(state){
    if(state == "mainMenu"){
        clear();
        StartMenu();
    }else if(state == "gameover"){
        clear();
        gameOver();
    }

}


gameSt(gameState);
//StartMenu();