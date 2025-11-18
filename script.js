let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velX = 0, velY = 0;
let score = 0;
let gameOver = false;

const playBoard = document.querySelector(".play-board");

function setFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function moveFunction() {
    for (let i = snakeBody.length - 1; i > 0; i++) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
}

function changeDirection(e) {
    if (e.key === "ArrowUp" && velY !== 1) {
        velX = 0;
        velY = -1;
    }
    else if (e.key === "ArrowDown" && velY !== -1) {
        velX = 0;
        velY = 1;
    }
    else if (e.key === "ArrowLeft" && velX !== 1) {
        velX = -1;
        velY = 0;
    }
    else if (e.key === "ArrowRight" && velX !== -1) {
        velX = 1;
        velY = 0;
    }
}

function moveHead() {
    snakeX += velX;
    snakeY += velY;
}

function updateGame() {
    if (gameOver) {
        alert("Game Over! Press OK to restart.");
        location.reload();
        return;
    }

    moveHead();

    if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
        gameOver = true;
        return;
    }

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        setFoodPosition();
    }

    moveFunction();

    let html = "";

    html += `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    for (let i = 0; i < snakeBody.length; i++) {

        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if (i !== 0 &&
            snakeBody[0][0] === snakeBody[i][0] &&
            snakeBody[0][1] === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = html;
}

setFoodPosition();
document.addEventListener("keydown", changeDirection);
setInterval(updateGame, 100);
