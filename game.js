const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 250, width: 40, height: 40, vy: 0, onGround: false, direction: 'right' };
let gravity = 0.6;
let jumpPower = -10;
let keys = {};
let gameEnded = false;
let marioFrame = 0;
let marioImage = new Image();
marioImage.src = 'mario-sprites.png'; // Make sure Mario sprite is in your project folder

// Walking frames for Mario (these are the coordinates for the sprite sheet)
const marioFrames = { 
  right: [0, 40, 80], // Frame positions for right direction (adjust based on your sprite sheet)
  left: [120, 160, 200] // Frame positions for left direction (adjust based on your sprite sheet)
};

// Input handling
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Draw player with walking animation
function drawPlayer() {
  let frameX = marioFrames[player.direction][marioFrame]; // Get frame for walking animation
  ctx.drawImage(marioImage, frameX, 0, 40, 40, player.x, player.y, player.width, player.height); // Draw Mario

  // Update frame for animation (cycle through the 3 frames)
  if (player.direction === 'right' || player.direction === 'left') {
    marioFrame = (marioFrame + 1) % 3; // Loop through 3 frames for walking animation
  }
}

// Draw platforms (game ground)
function drawPlatforms() {
  ctx.fillStyle = "#d3cfc7";
  platforms.forEach(p => {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });
}

// Draw hearts (collectables)
function drawHearts() {
  ctx.font = "20px Arial";
  hearts.forEach(heart => {
    if (!heart.collected) {
      ctx.fillText("❤️", heart.x, heart.y);
    }
  });
}

// Jump sound effect (ensure you have a jump.mp3 file in your project folder)
const jumpSound = new Audio('jump.mp3');

// Update player position and physics
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

// Trigger love truck when all hearts are collected
function triggerLoveTruck() {
  const truck = document.getElementById("loveTruck");
  truck.classList.remove("hidden");
}

// Start the game loop
gameLoop();



