console.log('working')

//===PLAN====
//Start menu
//load page
//Have character jump automatically
//Load platforms
//Upon impact with the platforms, character will accend whilst world decends, score will go up
//Generate new platforms
//As score reaches certain point platforms become more scarce

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



Player = function(x, y, dy, w, h){
    
    //constructor
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.w = w;
    this.h = h;


    //movement
    

    


    this.update = function(){

        // var xMovement ={
        //     37: false,
        //     39: false
        // }

        // document.addEventListener('keydown', function(e){
        //     if(e.keyCode in xMovement){
        //         xMovement[event.keyCode] = true;

        //         if(xMovement[37]){
        //             this.x -= 20;
        //         }else if(xMovement[39]){
        //             this.x += 20;
        //         }
        //     }
        // })

        if (this.y + this.h > canvas.height){ //change canvas to platform
            this.dy = -this.dy;
        } else{
            this.dy += 1;
        }
        this.y += this.dy
        this.draw();

        //this.y +=1;
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
function init(){
    player = new Player(500, 200, 2, 30, 60)
    platform = new Platform(500,500,200,20)
    platform2 = new Platform(800, 300, 200, 20)
}

function animate(){
    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
    platform.update();
    platform2.update();
    
}

var xMovement ={
    37: false,
    39: false
}

// document.addEventListener('keydown', function(e){
//     if(e.keyCode in xMovement){
//         xMovement[event.keyCode] = true;

//         if(xMovement[37]){
//             player.x -= 10;
//         }else if(xMovement[39]){
//             player.x += 10;
//         }
//     }
// })

document.addEventListener('keydown', function(e){
    var key_press = String.fromCharCode(event.keyCode);

    if(key_press == "A"){
        player.x -= 10;
    } else if(key_press == "D"){
        player.x += 10;
    }
})

init();
animate();





// var gravity = 3;


// //var player = context.fillRect(500, 200, 30, 60)
// var platform = context.fillRect(500, 500, 200, 20 )

// var Update = setInterval(function(){

//     //player.y +=gravity;
// })

