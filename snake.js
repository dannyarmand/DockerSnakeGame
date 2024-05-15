// Define canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set initial snake position and size
let snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }];
let dx = 10;
let dy = 0;
let foodX;
let foodY;
let score = 0;

// Generate random food position
function generateFood() {
    foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
    foodY = Math.floor(Math.random() * canvas.height / 10) * 10;
}

// Draw snake
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = "green";
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Move snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    const ateFood = snake[0].x === foodX && snake[0].y === foodY;
    if (ateFood) {
        score += 10;
        document.getElementById("score").innerText = 'Score: ' + score;
        generateFood();
    } else {
        snake.pop();
    }
}

// Draw food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeStyle = "black";
    ctx.strokeRect(foodX, foodY, 10, 10);
}

// Check for collisions
function checkCollision() {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || checkSelfCollision();
}

function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Draw castle
function drawCastle() {
    // Draw castle structure
    ctx.fillStyle = "#d3b796";
    ctx.fillRect(225, 250, 150, 150);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(225, 250, 150, 150);

    // Draw turrets
    drawTurret(200, 180); // Left turret
    drawTurret(canvas.width - 260, 180); // Right turret
}

// Draw a turret
function drawTurret(x, y) {
    ctx.fillStyle = "#d3b796";
    ctx.fillRect(x, y, 60, 120);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 50, y);
    ctx.lineTo(x + 30, y - 40);
    ctx.closePath();
    ctx.stroke();
}

// Increase snake speed
let snakeSpeed = 80;

// Game loop
function gameLoop() {
    if (checkCollision()) {
        alert("Game Over! Your score is " + score);
        document.location.reload();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCastle();
    drawFood();
    moveSnake();
    drawSnake();

    setTimeout(gameLoop, snakeSpeed);
}

// Start the game
generateFood();
gameLoop();

// Handle keyboard controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}
