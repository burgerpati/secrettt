const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 250, width: 20, height: 20, vy: 0, onGround: true };
let gravity = 0.8;
let jumpPower = -12;
let keys = {};
let platforms = [{ x: 0, y: 270, width: 800, height: 30 }];
let hearts = [
  { x: 200, y: 230, collected: false },
  { x: 400, y: 230, collected: false },
  { x: 600, y: 230, collected: false },
];
let gameEnded = false;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function drawPlayer() {
  ctx.fillStyle = "#333";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = "#d3cfc7";
  for (let plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }
}

function drawHearts() {
  ctx.font = "20px Arial";
  for (let heart of hearts) {
    if (!heart.collected) {
      ctx.fillText("❤️", heart.x, heart.y);
    }
  }
}

function updatePlayer() {
  if (keys[" "] && player.onGround) {
    player.vy = jumpPower;
    player.onGround = false;
  }

  player.vy += gravity;
  player.y += player.vy;

  // Collision with ground
  for (let plat of platforms) {
    if (player.y + player.height >= plat.y && player.y + player.height <= plat.y + 10 &&
        player.x + player.width > plat.x && player.x < plat.x + plat.width) {
      player.y = plat.y - player.height;
      player.vy = 0;
      player.onGround = true;
    }
  }

  if (keys["ArrowRight"]) {
    player.x += 3;
  }

  if (keys["ArrowLeft"]) {
    player.x -= 3;
  }

  // Heart collection
  for (let heart of hearts) {
    if (!heart.collected &&
        player.x + player.width > heart.x - 10 &&
        player.x < heart.x + 10 &&
        player.y < heart.y + 10 &&
        player.y + player.height > heart.y - 20) {
      heart.collected = true;
    }
  }

  if (hearts.every(h => h.collected) && !gameEnded) {
    triggerLoveTruck();
    gameEnded = true;
  }
}

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

function triggerLoveTruck() {
  const truck = document.getElementById("loveTruck");
  truck.classList.remove("hidden");
}

gameLoop();
