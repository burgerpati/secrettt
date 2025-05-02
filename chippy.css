let happiness = 100;
const bar = document.getElementById("happiness-bar");
const statusText = document.getElementById("status");
const catTalk = document.getElementById("cat-talk");
const cat = document.getElementById("cat");

const messages = [
  "Pet me, hooman!",
  "I'm ignoring you, but I love you.",
  "More attention!",
  "Don't stop clicking!",
  "I'm the boss here.",
  "Feed me... emotionally."
];

function updateBar() {
  bar.style.width = happiness + "%";
  statusText.textContent = "Happiness: " + happiness + "%";

  if (happiness <= 0) {
    statusText.textContent = "The cat is sad 😿";
    catTalk.textContent = "You monster... 😾";
    cat.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/616/616408.png')";
  } else if (happiness >= 80) {
    cat.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2021/04/18/09/13/cat-6186929_960_720.png')";
    catTalk.textContent = messages[Math.floor(Math.random() * messages.length)];
  }
}

function decreaseHappiness() {
  if (happiness > 0) {
    happiness -= 1;
    updateBar();
  }
}

function increaseHappiness() {
  if (happiness < 100) {
    happiness += 10;
    if (happiness > 100) happiness = 100;
    updateBar();
  }
}

function startGame() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "block";
  updateBar();
  setInterval(decreaseHappiness, 1000);
}
