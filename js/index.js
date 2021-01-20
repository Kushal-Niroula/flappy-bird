var canvas = document.getElementById("canvas");
let height = 600;
let width = 500;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

var base = document.getElementById('base');
var backgroundImage = document.getElementById('bg');
var uPipe = document.getElementById('u-pipe');
var dPipe = document.getElementById('d-pipe');
var birdImg = document.getElementById('bird');
var scoreBoard =  document.getElementsByClassName('score')[0];
const gap = 120;
const baseHeight = 100;
let distance = 0;
const pipeWidth = 40;
var bird = {
    x:150,
    y:200
}
var lx =350

var obstacle = []
obstacle.push({
    x:lx,
    height:150
})

let k ;
let acc = 0;
let initialSpeed = 2;
let score = 0;

setInterval(generate,500)



let G=0


requestAnimationFrame(update);

function update(){
    
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    ctx.drawImage(birdImg , bird.x , bird.y);
    k = 0;
    bird.y = bird.y + G
    G = G + 0.2;
    
    

    
    
    for (var i = 0 ; i<obstacle.length ; i++){
    ctx.drawImage(uPipe,obstacle[i].x,0,pipeWidth, obstacle[i].height);
    ctx.drawImage(dPipe,obstacle[i].x,obstacle[i].height+gap,pipeWidth,canvas.height-(obstacle[i].height+gap+baseHeight));
    obstacle[i].x  = obstacle[i].x - initialSpeed +-1* acc;
    if(obstacle[i].x < bird.x){
        obstacle.splice(i,1);
        score = score + 1;
        scoreBoard.innerHTML = score;

    }
    distance = Math.abs(distance+initialSpeed+acc);
   
   
    

    
    }

    ctx.drawImage(base,0,canvas.height-baseHeight, canvas.width,baseHeight);
    acc=acc+0.001;
    requestAnimationFrame(update);
    
}

function generate(){

    x1 = lx + randomizer().change;
    lx = x1;
    obstacle.push({
        x:x1,
        height:randomizer().height
    })

}

function randomizer(){
    let oGap = Math.ceil(Math.random()*50)+250;
    let h = Math.floor(Math.random()*(canvas.height - gap - baseHeight -20))+10;
    return{
        change:oGap,
        height:h
    }
}
document.addEventListener('click',function(e){
    G = 0;
    bird.y = bird.y - 40;
})



