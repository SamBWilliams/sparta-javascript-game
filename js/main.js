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

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

var context = canvas.getContext('2d')

//keyboard input



Player = function(x, y, gravity, w, h){
    
    //constructor
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.w = w;
    this.h = h;
    this.jumpCounter = 15;

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
        
        // for (let i = 0; i < platformArray.length; i++) {
        //     if (this.y + this.h > platformArray[i].y && this.x >= platformArray[i].x && this.x <= platformArray[i].x + platformArray[i].w){ 
            
        //         this.gravity = -this.gravity;
        //     } else{
        //         this.gravity += .8;
        //     }
            
        // }

        //game object platform generator
        // else if (this.y + this.h > randomPlatform.y && this.x >= randomPlatform.x && this.x <= randomPlatform.x + randomPlatform.w){ 
            
        //     this.gravity = -this.gravity;
        // }
        // else{
        //     this.gravity += 1;
        // }

        // else if (this.y + this.h > platFormGenerator().y && this.x >= platFormGenerator().x && this.x <= platFormGenerator().x + platFormGenerator().w){ 
            
        //     this.gravity = -this.gravity;
        // }
        // else{
        //     this.gravity += 1;
        // }

        // else if (this.y + this.h > platformArray[i].y && this.x >= platformArray[i].x && this.x <= platformArray[i].x + platformArray[i].w){ 
            
        //     this.gravity = -this.gravity;
        // }
        // else{
        //     this.gravity += 1;
        // }

        // else if (this.y + this.h > platform.y && this.x >= platform.x && this.x <= platform.x + platform.w){ 
            
        //     this.gravity = -this.gravity;
        // }else if (this.y + this.h > platform2.y && this.x >= platform2.x && this.x <= platform2.x + platform2.w){ 
            
        //     this.gravity = -this.gravity;
        // }
        // else{
        //     this.gravity += 1;
        // }

        //FOR EACH JUMP ADD TO PLATFORM ARRAY TO GENERATE PLATFORM

        platformArray.forEach(randomPlatform => {
            
            if (this.y + this.h > randomPlatform.y && this.x >= randomPlatform.x && this.x <= randomPlatform.x + randomPlatform.w && this.gravity >0.8){ 
            
                this.gravity = -this.gravity;
                //this.jumpCounter++;
                
                
            } else{
                this.gravity += 0.8;
                this.gravity -= 0.7;
                // if(this.y + this.h < randomPlatform.y){}
                //     this.gravity -= 0.8;
                // }
            }
            
        });

        //add jump counter
    }


    this.update = function(){

        this.jump();
        this.y += this.gravity
        this.draw();
    }


    this.draw = function(){
        context.fillRect(this.x, this.y, this.w, this.h)

    }
}

class Game{
    constructor(){

    }

    // platFormGenerator(){

    // }
}


Platform = function(x,y,w,h){
    
    //constructor
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.update = function(){

        this.y +=2;
        this.draw();

        // if (this.y > 50){
        //     for (let i = 0; i < 10; i++) {
        //         ranPlatform = new Platform(x, y, 200, 20)
                
        //     }
        // }

        // for (let i = 0; i < 10; i++) {
        //     this.draw();
            
        // }
        
    }




    this.draw = function(){
        context.fillRect(this.x, this.y, this.w, this.h)

    }
}






var player;
var platform;
var platform2;
var basePlatform;
var randomPlatform;
let platformArray = []

function init(){
    player = new Player(400, 100, 10, 30, 60)
    platform = new Platform(500,500,200,20)
    platform2 = new Platform(800, 300, 200, 20)
    basePlatform = new Platform(200, 700, 1000, 20)

    // let gamerunning = true

    // while(gamerunning){
    //     for (let i = 0; i < 10; i++) {
    //         let x = Math.random() * canvas.height;
    //         let y = Math.random() * canvas.width;
    //         randomPlatform = new Platform(x, y, 200, 20)
    //  }

    // }
    
     for (let i = 0; i < 15; i++) {
            let x = Math.random() * canvas.height;
            let y = Math.random() * canvas.width;
            randomPlatform = new Platform(x, y, 200, 20)
            platformArray.push(randomPlatform)
     }

    //  for (let i = 0; i < 10; i++) {
    //      platformArray[i] = new Platfrom(x,y,200,20)
         
    //  }
    //     platformArray.push(randomPlatform)
        
        
    // }
    console.log(platformArray)
}

// function positionGenerator(){
//     var x = Math.random() * canvas.width
//     var y = Math.random() * canvas.height

//     return(x ,y);
// }

// function platFormGenerator(xAxis, yAxis){
//     positionGenerator();
//     ranPlatform = new Platform(xAxis, yAxis, 200, 20)
//     return(ranPlatform);
    
// }



//randomPlatformArray = [];

// for (let i = 0; i < 4; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerWidth;
//     randomPlatform2 = new Platform(x, y, 200, 20)
    
// }

function animate(){
    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
    //platform.update();
    //platform2.update();
    basePlatform.update();
    randomPlatform.update();
    

    for (let i = 0; i < platformArray.length; i++) {
        platformArray[i].update();
        
    }
    // for (let i = 0; i < 10; i++) {
    //     randomPlatform.update();
        
    // }

   // randomPlatform.update();
    
    
}



//=======MOVEMENT=======
document.addEventListener('keydown', function(e){
    var key_press = String.fromCharCode(event.keyCode);

    if(key_press == "A"){
        player.x -= 50;
    } else if(key_press == "D"){
        player.x += 50;
    }
})

init();
animate();







