const playBoard=document.querySelector(".play-board")

const scoreElement = document.querySelector(".score");

const highscoreElement=document.querySelector(".high-score");

const control =document.querySelector(".controls i");



let gameover = false;
let foodX=0 , foodY=0;
let snakeX=5 , snakeY=10;
let snakeBody = [];
let velX = 0 ; velY = 0;
let setIntervalid =null;
let score = 0;
let highscore = localStorage.getItem("high-score") || 0 ;
highscoreElement.innerHTML = ` Highest Score : ${highscore}`;



const changeFoodposition=()=>{
    
    foodX= Math.floor(Math.random() * 30) + 1;
    foodY= Math.floor(Math.random() * 30) + 1;

}


const handleGameover =()=>{
  clearInterval(setIntervalid);
  alert("Game over ! Press Ok to replay..."); 
  location.reload();
}