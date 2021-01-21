/* initializing start screen */
var start = document.getElementById('start');
var startBtn = document.getElementById('start-btn');

/* main game play */
startBtn.onclick= function(){
/* loading dom elements */
  start.style.display ="none";
  var canvas = document.getElementById("canvas");
  canvas.style.opacity = 1;
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
  var scoreBoard =  document.getElementById('score');
  var end = document.getElementById('end');
  var hs = document.getElementById('hs');
  var replay = document.getElementById('replay');

  replay.addEventListener('click',function(){
    document.location.reload();
  })
  end.style.display = "none";

  /* initializing in game parameters */
  var highscore = parseInt(localStorage.getItem("HS"));
  if(!highscore){
    highscore = 0;
  }

  const gap = 120;
  const baseHeight = 100;

  const pipeWidth = 40;
  var bird = {
      x:150,
      y:200,
      w:30,
      h:20
  }
  var lx = 350;

  var obstacle = []
  obstacle.push({
      x:lx,
      height:150
  })

  let acc = 0;
  let initialSpeed = 2;
  let score = 0;
  var isGameOver = false;

  var obsGenerate = setInterval(generate,500);
  var G=0

 /* start animation */
  requestAnimationFrame(update);

  function update(){

      ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
      ctx.drawImage(birdImg , bird.x , bird.y , bird.w ,bird.h);
      bird.y = bird.y + G
      G = G + 0.25; /* accelerating G value by 0.25 */





      for (var i = 0 ; i<obstacle.length ; i++){
        ctx.drawImage(uPipe,obstacle[i].x,0,pipeWidth, obstacle[i].height);
        ctx.drawImage(dPipe,obstacle[i].x,obstacle[i].height+gap,pipeWidth,canvas.height-(obstacle[i].height+gap+baseHeight));
        obstacle[i].x  = obstacle[i].x - initialSpeed +-1* acc;
        checkCollision(bird.x , bird.y, obstacle[i].x ,0 , bird.w,bird.h , pipeWidth,obstacle[i].height);
        checkCollision(bird.x , bird.y, obstacle[i].x ,obstacle[i].height+gap, bird.w,bird.h , pipeWidth,canvas.height-(obstacle[i].height+gap+baseHeight))
        if(obstacle[i].x < -pipeWidth){
            obstacle.splice(i,1);
            score = score + 1;

            scoreBoard.innerHTML = score;

      }

      }

      ctx.drawImage(base,0,canvas.height-baseHeight, canvas.width,baseHeight);
      acc = acc + 0.001;
      if(!isGameOver){
      requestAnimationFrame(update);
    }
  }

/* function to generate obstacle */
  function generate(){

      x1 = lx + randomizer().change;
      lx = x1;
      obstacle.push({
          x:x1,
          height:randomizer().height
      })

  }

/* function to randomize obstacle */
  function randomizer(){
      let oGap = Math.ceil(Math.random()*50)+250;
      let h = Math.floor(Math.random()*(canvas.height - gap - baseHeight -20))+10;
      return{
          change:oGap,
          height:h
      }
  }

  /* jumping on click */
  document.addEventListener('click',function(e){
      G = 0;
      bird.y = bird.y - 50;
  })

  /* function to checkcollision */
  function checkCollision(x1,y1,x2,y2,w1,h1,w2,h2){
      if (x1+ w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2) {
          isGameOver = true;

  }
  if(y1 + h1 > canvas.height - baseHeight + 8){
    isGameOver = true;

  }
  if(isGameOver){
    if(score > highscore){
        highscore = score;
        localStorage.setItem('HS',highscore); /*adding the highscore in local storage */
    }
    gameOver();
  }
  }

  /* game over handler */
  function gameOver(){
    canvas.style.opacity = "0.5";
    end.style.display = "block"

    hs.innerHTML = "Highscore " + highscore;
    clearInterval(obsGenerate);
    obstacle = [];
  }
}
