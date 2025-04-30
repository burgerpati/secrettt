const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 250, width: 40, height: 40, vy: 0, onGround: false, direction: 'right' };
let gravity = 0.6;
let jumpPower = -10;
let keys = {};
let gameEnded = false;
let marioFrame = 0;
let marioImage = new Image();
marioImage.src = 'mario-sprites.png'; // Load the sprite sheet

// Walking frames: Let's assume Mario has 3 frames for walking right.
const marioFrames = { 
  right: [0, 40, 80], // Frame positions for right direction in sprite sheet (adjust these based on your sprite sheet)
  left: [120, 160, 200] // Frame positions for left direction in sprite sheet
};

// Input handling
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Draw player with animation
function drawPlayer() {
  // Mario walking animation
  let frameX = marioFrames[player.direction][marioFrame];
  
  ctx.drawImage(marioImage, frameX, 0, 40, 40, player.x, player.y, player.width, player.height); // Drawing Mario
  
  // Update frame for animation
  if (player.direction === 'right' || player.direction === 'left') {
    marioFrame = (marioFrame + 1) % 3; // Loop through 3 frames for walking animation
  }
}

// Draw platforms
function drawPlatforms() {
  ctx.fillStyle = "#d3cfc7";
  platforms.forEach(p => {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });
}

// Draw hearts
function drawHearts() {
  ctx.font = "20px Arial";
  hearts.forEach(heart => {
    if (!heart.collected) {
      ctx.fillText("❤️", heart.x, heart.y);
    }
  });
}

// Jump sound effect
const jumpSound = new Audio('jump.mp3'); // Ensure you have a jump sound file in your project folder

// Update player logic
function updatePlayer() {
  // Movement
  if (keys["ArrowRight"]) {
    player.x += 3;
    player.direction = 'right';  // Set direction to right
  }
  if (keys["ArrowLeft"]) {
    player.x -= 3;
    player.direction = 'left';  // Set direction to left
  }

  // Jump
  if (keys[" "] && player.onGround) {
    player.vy = jumpPower;
    player.onGround = false;
    jumpSound.play();  // Play jump sound
  }

  // Apply gravity
  player.vy += gravity;
  player.y += player.vy;

  // Ground collision
  player.onGround = false;
  platforms.forEach(p => {
    if (player.y + player.height >= p.y && player.y + player.height <= p.y + 10 &&
        player.x + player.width > p.x && player.x < p.x + p.width) {
      player.y = p.y - player.height;
      player.vy = 0;
      player.onGround = true;
    }
  });

  // Collect hearts
  hearts.forEach(heart => {
    if (!heart.collected &&
        player.x + player.width > heart.x - 10 &&
        player.x < heart.x + 10 &&
        player.y < heart.y &&
        player.y + player.height > heart.y - 20) {
      heart.collected = true;
    }
  });

  // All hearts collected?
  if (hearts.every(h => h.collected) && !gameEnded) {
    triggerLoveTruck();
    gameEnded = true;
  }
}

// Animation loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatforms();
  drawPlayer();
  drawHearts();
  updatePlayer();

  if (!gameEnded) {
    requestAnimationFrame(gameLoop);
  }
}

// Trigger love truck
function triggerLoveTruck() {
  const truck = document.getElementById("loveTruck");
  truck.classList.remove("hidden");
}

// Start the game loop
gameLoop();



