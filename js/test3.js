var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')




var clear = function(){
	ctx.fillStyle = back;
	ctx.beginPath();
	ctx.rect(0,0, width, height);
	ctx.closePath();
	ctx.fill();
};

var Player = new (function (){
    
    this.width = 40;
	this.height = 70;
	
	this.X = 0;
    this.Y = 0;

	this.isJumping = 0;
	this.isFalling = 0;
	
	this.jumpSpeed = 0;
	this.fallSpeed = 0;

	this.isMoving = true;
	
	this.setPosition = function(x, y){
		this.X = x;
		this.Y = y;
    }
    
    this.jump = function() {
		if(!this.isFalling) {
			this.isJumping = true;
			this.jumpSpeed = 22;
		}
    }
    
    this.checkJump = function() {
		if(that.Y > height * 0.25) {
			this.setPosition(that.X, that.Y - this.jumpSpeed);
		} else {
			if(this.jumpSpeed > 10) points += 100;
			
			platforms.forEach(function(platform, ind) {
				platform.Y += this.jumpSpeed;
				
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
		}else{
			if(points == 0) {
				that.fallStop();
				}else{ 
					GameOver(); //reload function
				}
		}
    }
    
    this.fallStop = function() {
		this.isFalling = false;
		this.fallSpeed = 0;
		this.jump();
    }
    
    that.moveLeft = function(theX) {
		if((that.X > 0) && that.isMoving) {
			that.setPosition(theX - that.width/2, that.Y);
		}
	}
	
	that.moveRight = function(theX) {
		if((that.X + that.width < width) && that.isMoving) {
			that.setPosition(theX - that.width/2, that.Y);
		}
    }
    
    this.update = function() {

		if(that.isJumping){
            that.checkJump();
        }else if(that.isFalling){
            this.checkFall();  
        }
		 
		this.draw();
    }
    
    this.draw = function(){

		ctx.fillRect(this.X, this.Y, this.width, this.height);
	}


})();

var Platform = function(x, y) {
	
	this.onCollide = function() {
		player.fallStop();
	}
	
	
	this.draw = function() {
		ctx.fillStyle = 'black';
		ctx.fillRect(that.X, that.Y, platformWidth, platformHeight);
	}
	
	this.X = x;
	this.Y = y;
	
	return this;
};

var nrOfPlatforms = 7,
	platforms = [],
	platformWidth = 50;
    platformHeight = 10;

var generatePlatforms = function() {
    var position = 0 //type;
        
    for(var i = 0; i < nrOfPlatforms; i++) {
            
        platforms[i] = new Platform(Math.random()*(width-platformWidth), position);
            
        if(position < height - platformHeight){
                position += (height / nrOfPlatforms); 
        } 
    }
}();

    //see if you can arrow this vvv

var checkCollision = function() {
    platforms.forEach(function(e) {
        if((player.isFalling) && (player.X < e.X + platformWidth) && (player.Y + player.height > e.Y) &&(player.Y + player.height < e.Y + platformHeight)) {
            e.onCollide();
        }
    })
}


document.onmousemove = function(e) {
	if(state == 1) {
		if(player.X + c.offsetLeft > e.pageX - 20) {
			player.moveLeft(e.pageX - c.offsetLeft);
		} else if(player.X + c.offsetLeft < e.pageX - 20) {
			player.moveRight(e.pageX - c.offsetLeft);
		}
	}
};

document.onmousedown = function(e) {
	if(state == 0) {
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
		gLoop = setTimeout(GameLoop, 1000 / 50);
	}
}

var StartMenu = function() {
	clear();
	
	
	ctx.font = "20pt Arial";
	ctx.fillStyle = "Black";
	ctx.fillText("Click to play", width / 2 - 150, height / 2 - 50);
	
	if(state == 2)
		gLoop = setTimeout(StartMenu, 1000 / 50);
	else {
		clearTimeout();
		GameLoop();
	}
}

StartMenu();




    
