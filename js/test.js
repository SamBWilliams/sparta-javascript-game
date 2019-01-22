var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

Player = function(x, y, dy, w, h){

    this.x = x;
    this.y = y;
    this.dy = dy;
    this.w = w;
    this.h = h;


    this.platformCollision = function(){

    }


    this.update = function(){
        this.y += this.dy
        
        this.draw();
    }

    this.draw = function(){
        ctx.fillRect(this.x, this.y, this.w, this.h)

    }




}

var spawnLineY = 25;

// spawn a new object every 1500ms
var spawnRate = 500;

// set how fast the objects will fall
var spawnRateOfDescent = 2.0;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var platforms = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start animating
animate();


function spawnRandomObject() {

    // create the new object
    var platform = {
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,
    }

    // add the new object to the objects[] array
    platforms.push(platform);
}

// function createPlayer(){

//     var player = {
//         x: 400,
//         y: 200,
//         dy: 10,
//         w: 30,
//         h: 60

//     }
// }



function animate() {

    requestAnimationFrame(animate);

    //createPlayer()

   // player.update();

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // // request another animation frame
    // requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //player.update();
    // draw the line where new objects are spawned
    ctx.beginPath();
    ctx.moveTo(0, spawnLineY);
    ctx.lineTo(canvas.width, spawnLineY);
    ctx.stroke();
    

    // move each object down the canvas
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        platform.y += spawnRateOfDescent;
        
        let randomPlatorm = ctx.fillRect(platform.x, platform.y, 200, 20)
        
    }

    
   // player.update();
    //let player = new Player(400, 200, 10, 30, 60)

    var playerX = 400;
    var playerY = 200;
    var playerW = 30;
    var playerH = 60;

    // let player = ctx.fillRect(playerX, playerY, playerW, playerH)

    // document.addEventListener('keydown', function(e){
    //     var key_press = String.fromCharCode(event.keyCode);
    
    //     if(key_press == "A"){
    //         player.playerX -= 50;
    //         console.log(platformArray[0])
    //     } else if(key_press == "D"){
    //         player.playerX += 50;
    //     }
    // })


}


    var playerX = 400;
    var playerY = 200;
    var playerW = 30;
    var playerH = 60;

    let player = ctx.fillRect(playerX, playerY, playerW, playerH)

    document.addEventListener('keydown', function(e){
        var key_press = String.fromCharCode(event.keyCode);
    
        if(key_press == "A"){
            player.playerX -= 50;
            console.log(platformArray[0])
        } else if(key_press == "D"){
            player.playerX += 50;
        }
    })

// function animatePlayer(){
//     requestAnimationFrame(animatePlayer);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     player.update();
// }

// function init(){
//     player = new Player(400, 200, 10, 30, 60)
// }

// animatePlayer();

// init();
animate();

