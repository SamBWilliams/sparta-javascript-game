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



Player = function(x, y, gravity, w, h, counter, score){
    
    //constructor
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.w = w;
    this.h = h;
    this.jumpCounter = 15;
    this.counter = counter;
    this.gravity += 1;
    this.score = score;


    // this.jump = function(){
        
    //     if (this.y + this.h > basePlatform.y){ //change canvas to platform
    //         this.gravity = -this.gravity;
    //     }
    //     //Allows player to jump on platform
        

    //     //FOR EACH JUMP ADD TO PLATFORM ARRAY TO GENERATE PLATFORM
        

    //     platformArray.forEach(randomPlatform => {
            
    //         if (this.y + this.h > randomPlatform.y && this.x >= randomPlatform.x && this.x <= randomPlatform.x + randomPlatform.w && this.gravity >0.8){ 
            
    //             this.gravity = -this.gravity;

    //             platformArray.forEach(randomPlatform =>{
    //                 randomPlatform.y +=20;

    //             })
    //             //this.jumpCounter++;
                
                
    //         } else{
    //             this.gravity += 0.8;
    //             this.gravity -= 0.7;
    //             // if(this.y + this.h < randomPlatform.y){}
    //             //     this.gravity -= 0.8;
    //             // }
    //         }
            
    //     });

    //     //add jump counter
    // }


    this.platformSpawner = function(){
        
        platformArray.forEach(randomPlatform => {
            
            if (this.y + this.h > randomPlatform.y && this.x >= randomPlatform.x && this.x <= randomPlatform.x + randomPlatform.w && this.gravity >0.8){ 
                // && this.gravity >0.8
            
                this.gravity = -this.gravity;
                this.counter ++;
                //this.jump();

                platformArray.forEach(randomPlatform =>{
                    randomPlatform.y +=5;

                })
                //this.jumpCounter++;
                
                
            } else{
                this.gravity += 0.8;
                this.gravity -= 0.7;
                this.score ++;
                // if(this.y + this.h < randomPlatform.y){}
                //     this.gravity -= 0.8;
                // }
            }
            
        });

        //add jump counter
    }

    this.gameOver = function(){
        if(this.y > 800){
            alert("Game over")
        }
    }

    // this.jump = function(){
    //     this.y += 5;
    // }
    




    this.update = function(){
        //this.gameOver();
        this.platformSpawner()
        //this.jump();
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

        // setInterval(function(){
        //     this.draw(); 
        // },3000)
        this.draw();
        
        // if (this.y > 800){
        //     initPlatforms();
        // }

        
    }

    this.draw = function(){

    //     setInterval(function(){
    //     for (let i = 0; i < platformArray.length; i++) {
    //         context.fillRect(this.x, this.y, this.w, this.h)
            
    //     }  
    // }, 3000)

    // let x = Math.random() * canvas.height;
    // let y = Math.random() * canvas.width;
    // test = new Platform(this.x = x, this.y = y, this.w = 200, this.h = 20) //Constant platform spawn

    context.fillRect(this.x, this.y, this.w, this.h)

    }
}


var player;
var platform;
var platform2;
var basePlatform;
var randomPlatform;
let platformArray = []
let yArray = [];

function init(){
    player = new Player(400, 200, 10, 30, 60, 0, 0)
    platform = new Platform(500,500,200,20)
    platform2 = new Platform(800, 300, 200, 20)
    basePlatform = new Platform(0, 650, 1000, 20)

    
     for (let i = 0; i < 15; i++) {
            let x = Math.random() * canvas.height;
            let y = Math.random() * canvas.width;
           // let y = 
            randomPlatform = new Platform(x, y, 200, 20)
            platformArray.push(randomPlatform)
            yArray.push(randomPlatform.w)
     }

    console.log(platformArray)
}

// function initPlatforms(){
//     for (let i = 0; i < 1; i++) {
//         let x = Math.random() * canvas.height;
//         let y = Math.random() * canvas.width;
//        // let y = 
//         randomPlatform = new Platform(x, y, 200, 20)
//         platformArray.push(randomPlatform)
//  }
// }



function animate(){
    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
    //platform.update();
    //platform2.update();
    basePlatform.update();
    //randomPlatform.update(); - faster moving platform
    
    // if(player.counter =  3){
    //     for (let i = 0; i < platformArray.length; i++) {
    //         platformArray[i].update();
            
    //     }
    // }

    // setInterval(function (){
    //     test.update();
    // }, 10000)
    //test.update();

    // randomPlatform.update()
    // setInterval(function(){
    //     for (let i = 0; i < platformArray.length; i++) {
    //         platformArray[i];

    //         //console.log(platformArray[i])
            
            
    //     }  
    // }, 3000)

   // console.log(platformArray)
    //    let num = 0;
    //    let num2 = 0;

    //    while (num != 2){
    //        if (player.y =200){
    //         for (let i = 0; i < platformArray.length; i++) {
    //             platformArray[i].update();
    //         }
    //        }
            
    //     }

   //}

//    if (platformArray[0].y > 500){
    for (let i = 0; i < platformArray.length; i++) {
        if (player.y === i*600){
            platformArray.update();
           }

   }

   

   

//    if (player.y === i*600){
//     platformArray[i].update();
//    }



        // for (let i = 0; i < platformArray.length; i++) {
        //         platformArray[i].update();
        // }
        
       // platformArray[i].update();

        //requestAnimationFrame(platformSpawner2)
        
}


    
    

// var platformSpawner2 = function(){
//     setInterval(function(){
//         for (let i = 0; i < platformArray.length; i++) {
//             platformArray[i].update();
            
//         }  
//     }, 3000)
// }



//=======MOVEMENT=======
document.addEventListener('keydown', function(e){
    var key_press = String.fromCharCode(event.keyCode);

    if(key_press == "A"){
        player.x -= 50;
       // console.log(platformArray[0])
    } else if(key_press == "D"){
        player.x += 50;
    }
})

// function maxLength(array){
//     let x = array[0];
//     for (let i = 1; i < array.length; i++){
//         if (array[i] > x){
//           x = array[i];
//         }
//     }
//     return x
//   }
  
//   maxLength(yArray)
//   console.log(maxLength(yArray))


init();
//initPlatforms();
animate();
// platformSpawner2();
// maxLength(yArray)
//   console.log(maxLength(yArray))
//   console.log(yArray)






