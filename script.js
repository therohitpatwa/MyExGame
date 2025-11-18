const scoreElement = document.querySelector(".score");
const playBoard = document.querySelector(".play-board");
const highscoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls button");

let gameover = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = []; 
let velX = 0, velY = 0;
let setIntervalId;let score = 0;

// Load high score
let highscore = localStorage.getItem("high-score") || 0;
highscoreElement.innerHTML = `High Score : ${highscore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};



const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game over! Press OK to replay...");
    location.reload();
};

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velY !== 1) {
        velX = 0; velY = -1;
    } else if (e.key === "ArrowDown" && velY !== -1) {
        velX = 0; velY = 1;
    } else if (e.key === "ArrowLeft" && velX !== 1) {
        velX = -1; velY = 0;
    } else if (e.key === "ArrowRight" && velX !== -1) {
        velX = 1; velY = 0;
    }
};

controls.forEach(btn => {
    btn.addEventListener("click", () =>
        changeDirection({ key: btn.dataset.key })
    );
});

const initGame = () => {
    if (gameover) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX};"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highscore = Math.max(score, highscore);
        localStorage.setItem("high-score", highscore);

        scoreElement.innerHTML = `Current Score : ${score}`;
        highscoreElement.innerHTML = `High Score : ${highscore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];
    snakeX += velX;
    snakeY += velY;

    // Wall collision
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameover = true;
    }

    // Draw snake
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

        // Self-collision
        if (i !== 0 &&
            snakeBody[0][0] === snakeBody[i][0] &&
            snakeBody[0][1] === snakeBody[i][1]) {
            gameover = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 140);
document.addEventListener("keydown", changeDirection);
