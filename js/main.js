console.log('working')

//===PLAN====
//Start menu
//load page
//Have character jump automatically
//Load platforms
//Upon impact with the platforms, character will accend whilst world decends, score will go up
//Generate new platforms
//As score reaches certain point platforms become more scarce
//If player misses platform, game over

//===Player class===
//declare image
//jump function
//fall function

// class Player(){

// }


var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d')

//keyboard input



Player = function(x, y, gravity, w, h){
    
    //constructor
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.w = w;
    this.h = h;

    // this.jump = function(){//function(plat)
    //     if (this.y + this.h > canvas.height){ //change canvas to platform
    //         this.dy = -this.dy;
    //     } else{
    //         this.dy += 1;
    //     }
    // }

    this.jump = function(){
        if (this.y + this.h > basePlatform.y){ //change canvas to platform
            this.gravity = -this.gravity;
        }
        //Allows player to jump on platform
        else if (this.y + this.h > platform.y && this.x >= platform.x && this.x <= platform.x + platform.w){ 
            
            this.gravity = -this.gravity;
        }
        else{
            this.gravity += .8;
        }

        //add jump counter
    }


    this.update = function(){

        // if (basePlatform.Intersects(this)){
        //     if (this.y < basePlatform.y + basePlatform.w){}
        // }

        this.jump();
        this.y += this.gravity
        this.draw();
    }


    this.draw = function(){
        context.fillRect(this.x, this.y, this.w, this.h)

    }
}

Platform = function(x,y,w,h){
    
    //constructor
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.update = function(){
        this.draw();
    }


    this.draw = function(){
        context.fillRect(this.x, this.y, this.w, this.h)

    }
}




var player;
var platform;
var platform2;
var basePlatform;
function init(){
    player = new Player(400, 250, 10, 30, 60)
    platform = new Platform(500,500,200,20)
    platform2 = new Platform(800, 300, 200, 20)
    basePlatform = new Platform(200, 700, 1000, 20)
}

function animate(){
    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
    platform.update();
    platform2.update();
    basePlatform.update();
    
}



//=======MOVEMENT=======
document.addEventListener('keydown', function(e){
    var key_press = String.fromCharCode(event.keyCode);

    if(key_press == "A"){
        player.x -= 20;
    } else if(key_press == "D"){
        player.x += 20;
    }
})

init();
animate();







