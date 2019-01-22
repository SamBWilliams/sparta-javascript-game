var canvas = document.querySelector('canvas')
var context = canvas.getContext('2d')

var platforms = []
platforms[0] = {
    x: canvas.width,
    y: canvas.height,
    w: 0,
    h: 0 //Math.random for both these potentially
}

platformSpeed = 1;


function drawAll(){


    //generate platforms
    for (let i = 0; i < platforms.length; i++) {
        

        context.fillRect(platforms[i].x, platforms[i].y, 200, 10)


        //Movement of platforms
        platforms[i].y - platforms[i].y - platformSpeed;
        platforms.push(platforms[i]);
        
    }

    //Push to platform array

    //collision detection here
    // if(playerY + playerH > platforms[i].y && playerX >= platforms[i].x && playerX <= platforms[i].x + platforms[i].w){
    //     //player jumps
    //     //OR player hits
    // }

    //Potential lose condition
    // if(playerY < /*SOME NUMBER*/){
    //     alert("Lose")
    // }
}

//====Create player here with fillrect variables

var playerX = 400;
var playerY = 200;
var playerW = 30;
var playerH = 60;
//jump function
function jump(){
    playerY + 20;
}

context.fillRect(playerX, playerY, playerW, playerH)

drawAll()