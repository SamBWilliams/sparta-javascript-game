var width = 1000,
	height = 600,
	canvas = document.getElementById('canvas'),
	context = document.getElementsByTagName('canvas')[0].getContext('2d'),

	points = 0,
    state = 2,
    
	background = 'white', // Edit 
    gameRunning;
    
    
    deatSnd = new Audio("sounds/0477.mp3")
	
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
	this.height = 50;
	
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
           // points ++;

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
                alert("game over") //Edited      
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
		if((player.falling) &&
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
    
    context.font = "20pt Arial";
	context.fillStyle = "Black";
	context.fillText("Points: " + points, width / 2 - 500, height / 2 - 250);
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