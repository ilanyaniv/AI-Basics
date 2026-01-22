const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const speedElement = document.getElementById('speed');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const fasterBtn = document.getElementById('fasterBtn');
const slowerBtn = document.getElementById('slowerBtn');

// Game constants
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;

// Speed settings
const SPEED_LEVELS = [
    { delay: 250, name: 'Very Slow' },
    { delay: 200, name: 'Slow' },
    { delay: 150, name: 'Normal' },
    { delay: 100, name: 'Fast' },
    { delay: 50, name: 'Very Fast' }
];
let currentSpeedIndex = 2; // Start at Normal speed

// Game state
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameRunning = false;
let gamePaused = false;
let gameLoop = null;

// Load high score from localStorage
let highScore = localStorage.getItem('snakeHighScore') || 0;
highScoreElement.textContent = highScore;

// Generate random food position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// Draw functions
function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            drawRect(segment.x, segment.y, '#2ecc71');
        } else {
            // Body
            drawRect(segment.x, segment.y, '#27ae60');
        }
    });
}

function drawFood() {
    drawRect(food.x, food.y, '#e74c3c');
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw snake and food
    drawSnake();
    drawFood();
}

// Update game state
function update() {
    if (!gameRunning || gamePaused) return;
    
    // Move snake head
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };
    
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
    } else {
        snake.pop();
    }
}

// Game loop
function gameStep() {
    update();
    draw();
}

// Update game speed
function updateGameSpeed() {
    if (gameRunning) {
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, SPEED_LEVELS[currentSpeedIndex].delay);
    }
    speedElement.textContent = SPEED_LEVELS[currentSpeedIndex].name;
    
    // Update button states
    fasterBtn.disabled = currentSpeedIndex >= SPEED_LEVELS.length - 1;
    slowerBtn.disabled = currentSpeedIndex <= 0;
}

// Increase speed
function increaseSpeed() {
    if (currentSpeedIndex < SPEED_LEVELS.length - 1) {
        currentSpeedIndex++;
        updateGameSpeed();
    }
}

// Decrease speed
function decreaseSpeed() {
    if (currentSpeedIndex > 0) {
        currentSpeedIndex--;
        updateGameSpeed();
    }
}

// Start game
function startGame() {
    if (gameRunning) return;
    
    // Reset game state
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    gamePaused = false;
    gameOverElement.classList.add('hidden');
    
    generateFood();
    gameRunning = true;
    
    // Start game loop with current speed
    updateGameSpeed();
    startBtn.textContent = 'Restart';
}

// Pause/Resume game
function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
}

// Game over
function gameOver() {
    gameRunning = false;
    gamePaused = false;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
    startBtn.textContent = 'Start Game';
    pauseBtn.textContent = 'Pause';
}

// Restart game
function restartGame() {
    gameOverElement.classList.add('hidden');
    startGame();
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning || gamePaused) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
});

// Button event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', restartGame);
fasterBtn.addEventListener('click', increaseSpeed);
slowerBtn.addEventListener('click', decreaseSpeed);

// Initialize speed display
updateGameSpeed();

// Initial draw
draw();
