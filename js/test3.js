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

    this.image = new Image();
    this.image.src = "img/angel.png";
    
    this.width = 65;
	this.height = 95;
	
	this.X = 0;
    this.Y = 0;
    
   // this.actualFrame = 0;
	
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
    
    // that.moveLeft = function(theX) {
	// 	if((that.X > 0) && that.isMoving) {
	// 		that.setPosition(theX - that.width/2, that.Y);
	// 	}
	// }
	
	// that.moveRight = function(theX) {
	// 	if((that.X + that.width < width) && that.isMoving) {
	// 		that.setPosition(theX - that.width/2, that.Y);
	// 	}
    // }
    
    this.update = function() {

		if(that.isJumping){
            that.checkJump();
        }else if(that.isFalling){
            this.checkFall();  
        }
		 
		this.draw();
    }
    
    that.draw = function(){

		ctx.drawImage(that.image, 0, that.height, that.width, that.height,that.X, that.Y, that.width, that.height);
	}




})