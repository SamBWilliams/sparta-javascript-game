
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

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

    this.platformSpawner = function(){
        
        platformArray.forEach(randomPlatform => {
            
            if (this.y + this.h > randomPlatform.y && this.x >= randomPlatform.x && this.x <= randomPlatform.x + randomPlatform.w && this.gravity >0.8){ 
            
                this.gravity = -this.gravity;
                this.counter ++;
                platformArray.forEach(randomPlatform =>{
                    randomPlatform.y +=5;
                })
            } else{
                this.gravity += 0.8;
                this.gravity -= 0.7;
                this.score ++;
                platformSpawner();
            }
            
        });
    }

    this.gameOver = function(){
        if(this.y > 800){
            alert("Game over")
        }
    }

    this.update = function(){
        this.gameOver();
        this.platformSpawner()
        this.y += this.gravity
        this.draw();
    }

    this.draw = function(){
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
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

        
    }

    this.draw = function(){

        ctx.fillRect(this.x, this.y, this.w, this.h)

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

    for (let i = 0; i < 10; i++) {
        let x = Math.random() * canvas.height;
        let y = Math.random() * canvas.width;
       // let y = 
        randomPlatform = new Platform(x, y, 200, 10)
        platformArray.push(randomPlatform)

        
        

    }


    // platformArray.push(basePlatform)
    // console.log(platformArray[-1])

   // let y = platformArray[-1].y;
    //  for (let i = 0; i < 10; i++) {
    //      if(i =0 ){
    //         let x = Math.random() * canvas.height;
    //         let y = 200;
    //        // let y = 
    //         randomPlatform = new Platform(x, y, 200, 20)
    //         platformArray.push(randomPlatform)
    //         yArray.push(randomPlatform.w)
    //      }
    //     //  }else{
    //     //     let x = Math.random() * canvas.height;
    //     //     let y = platformArray[-1].y +200;
    //     //    // let y = 
    //     //     randomPlatform = new Platform(x, y, 200, 20)
    //     //     platformArray.push(randomPlatform)
    //     //     yArray.push(randomPlatform.w)
         
     

    console.log(platformArray)
}







function animate(){

    var counter =0;
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
    
    
    basePlatform.update();
   
    // setInterval(function (){
    //     respawnPlatforms();
    // }, 3000)
    respawnPlatforms();

    // counter ++;

    // if (counter%100 === 0){
    //     respawnPlatforms()
    // }
    

    // let x = Math.random() * canvas.height;
    // let y = Math.random() * canvas.width; 
   // ctx.fillRect(x, y, 200, 20)
    

           
}

function respawnPlatforms(){
    for (let i = 0; i < platformArray.length; i++) {
    platformArray[i].update();
    }
}




//=======MOVEMENT=======
document.addEventListener('keydown', function(e){
    var key_press = String.fromCharCode(event.keyCode);

    if(key_press == "A"){
        player.x -= 50;
        console.log(platformArray[0])
    } else if(key_press == "D"){
        player.x += 50;
    }
})



init();

animate();







