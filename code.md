const playBoard =  document.querySelector(".play-board");

const scoreElement = document.querySelector(".score");

const highscoreElement = document.querySelector(".high-score");

const controls = document.querySelectorAll(".controls i")


let gameover = false;
let foodX  , foodY;
let snakeX=5 , snakeY=10;
let snakeBody = [];
let velX = 0 ; velY = 0;
let setIntervalid ;
let score = 0;
//getting highscore from local storage
let highscore = localStorage.getItem("high-score") || 0 ;
highscoreElement.innerHTML = ` Highest Boys Eaten : ${highscore}`;


const changeFoodposition=()=>{
    
    foodX= Math.floor(Math.random() * 30) + 1;
    foodY= Math.floor(Math.random() * 30) + 1;

}
const handleGameover =()=>{
    //clearing the timer and reloading the page for new game on game over
    clearInterval(setIntervalid);
  alert("Game over ! Press Ok to replay..."); 
  location.reload();
}
const changeDirection =(e)=>{
    console.log(e);
  //  change velocity based onkey press
    if(e.key === "ArrowUp" && velY != 1){
        velX = 0;
        velY= -1 ;
    } else if(e.key === "ArrowDown"&& velY != -1){
        velX = 0;
        velY = 1;
    }else if(e.key === "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0 ;
    }else if(e.key === "ArrowRight"&& velX != -1){
        velX = 1;
        velY = 0;
    }
    
}
controls.forEach((key)=>{
    key.addEventListener("click" ,()=>changeDirection({key:key.dataset.key}));
})

const initGame = ()=>{
    if(gameover) return handleGameover();

   let htmlMarkup = <div class="food" style ="grid-area:${foodY} / ${foodX}"></div> ;
   if(snakeX === foodX && snakeY === foodY){
    changeFoodposition();
    snakeBody.push([foodX , foodY]) ; // pushing food position to snake body array 
    console.log(snakeBody)
     // increament score by 1
    score++;
    highscore = score >= highscore ? score :highscore;
    localStorage.setItem("high-score" , highscore)
   
    scoreElement.innerHTML = ` Current Boys : ${score}`
    highscoreElement.innerHTML = ` High Score : ${highscore}`;

   }
   for (let i = snakeBody.length -1 ; i > 0 ;i--) {
    snakeBody[i] = snakeBody[i -1]
    
   }

   snakeBody[0] = [snakeX , snakeY]; // setting current position of snake body to current snake position


// updating snake head position based on current velocity
   snakeX+=velX;
   snakeY+=velY;
// checking if the snake head is out of the wall , if so setting gameover is true
   if(snakeX <=0 || snakeX >30 || snakeY <= 0|| snakeY > 30){
    console.log("Game over");
    gameover= true;
   }

   for (let i = 0; i < snakeBody.length; i++) {
    // addding a div for each part of the snake body
    htmlMarkup+= <div class="head" style ="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>;
    //checking if snake has hit himself
    if(i!== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ){
        gameover = true;
    }
    
   }

  
   playBoard.innerHTML = htmlMarkup;
}
changeFoodposition();
 setIntervalid =  setInterval(initGame,140)
document.addEventListener("keydown" , changeDirection)