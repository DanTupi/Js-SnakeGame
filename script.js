let canvas = document.getElementById("backGround");
let context = canvas.getContext("2d"); 
let box = 32;

const initialVelocity = 130;
let = score = 0;
let direction = "right";

let snake = []; 
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function snakeLooping(){
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
}
function checkIfHit(){
    for(i = 1; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            clearInterval(game);
            alert('Game Over!\nRefresh the page\nto play again');
        }
    }
}

function createBG(){
    context.fillStyle = '#f0eac1';
    context.fillRect(0, 0, 16*box, 16*box);

}

function createSnake (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = '#2fb333';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = '#b4a11b';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function snakeBehaviour(){
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    } else {
        snake.pop();
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function initGame(){    
    createBG();
    createSnake();
    snakeLooping();
    checkIfHit();
    snakeBehaviour();
    drawFood();
}

let game = setInterval(initGame,initialVelocity);
