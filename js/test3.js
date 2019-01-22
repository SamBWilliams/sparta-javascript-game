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
    
    this.actualFrame = 0;
	
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



})