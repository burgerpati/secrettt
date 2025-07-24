const top = document.getElementById('topScreen');
const bot = document.getElementById('bottomScreen');
const t = top.getContext('2d');
const b = bot.getContext('2d');
t.imageSmoothingEnabled = b.imageSmoothingEnabled = false;

const palette = ['#D0EDC9','#A7D9A7','#8FC38F','#6FAE6F','#FFFFFF'];
const finalWord = 'butterfly';

let state = {
  session: 0,
  petals: false,
  mapFound: 0,
  sequenceSolved: false,
  enteredCottage: null
};

function drawHills() {
  t.fillStyle = palette[0]; t.fillRect(0,0,240,96);
  t.fillStyle = palette[1]; t.fillRect(0,60,240,36);
  t.fillStyle = palette[2]; t.fillRect(0,72,240,24);
}
function drawSparkles() {
  for(let i=0;i<20;i++){
    let x=Math.random()*240, y=60+Math.random()*36;
    t.fillStyle = (Math.random()<0.2?palette[4]:palette[2]);
    t.fillRect(x,y,2,2);
  }
}
function clearBottom() { b.clearRect(0,0,240,96); }

function updateTop() {
  t.clearRect(0,0,240,96);
  drawHills(); drawSparkles();
  t.fillStyle=palette[4]; t.font='8px "Press Start 2P"';
  t.textAlign='center';
  let labels = ['Adventure Quest','Session 1','Session 2','Session 3','Session 4','Final Session'];
  t.fillText(labels[state.session], 120,20);
}

function updateBottom(msg) {
  clearBottom();
  b.fillStyle=palette[1]; b.fillRect(0,0,240,96);
  b.fillStyle=palette[3]; b.fillRect(0,32,240,32);
  b.fillStyle=palette[4];
  b.font='8px "Press Start 2P"';
  b.textAlign='center';
  b.fillText(msg,120,56);
}

bot.addEventListener('click', () => {
  switch(state.session){
    case 0: startPuzzle1(); break;
    case 1: showMap(); break;
    case 2: startSequence(); break;
    case 3: choiceCottage(); break;
    case 4: finalChallenge(); break;
    default: location.reload();
  }
});

function startPuzzle1(){
  updateBottom('Puzzle 1: Riddle');
  let ans = prompt('“Where the silver petals sway, between dawn and day…”');
  if(ans && ans.toLowerCase().includes('meadow')){
    state.petals = true;
    alert('You found a silver petal!');
  }
  state.session++; updateTop(); updateBottom('Next Session');
}

function showMap(){
  updateBottom('Session 2: Map');
  let sel = prompt('Choose sector (e.g. 2,3):');
  let [x,y] = (sel||'').split(',');
  if(x==2 && y==3){ state.mapFound++; alert('Spark found!'); }
  if(state.mapFound>=1){ alert('Path of Light begins'); }
  state.session++; updateTop(); updateBottom('Next');
}

function startSequence(){
  updateBottom('Memory Sequence');
  let seq = ['A','B','C'];
  alert('Sequence: A→B→C');
  let inp = prompt('Enter it (e.g. ABC):');
  if(inp && inp.toUpperCase()===seq.join('')){
    state.sequenceSolved=true; alert('You lit the path!');
  }
  state.session++; updateTop(); updateBottom('Next');
}

function choiceCottage(){
  updateBottom('Enter cottage? Y/N');
  let yn = prompt('Enter inside? (Y/N)');
  state.enteredCottage = yn && yn.toLowerCase()=='y';
  alert(state.enteredCottage 
        ? 'Warm glow inside…' 
        : 'You chose to wait outside.');
  state.session++; updateTop(); updateBottom('Next');
}

function finalChallenge(){
  updateBottom('Final Word');
  let w = prompt('Type our special word:');
  if(w && w.toLowerCase()===finalWord){
    alert('🌸 Meadow blooms! 🌸');
    // animate fireworks
  } else {
    alert('That’s not it—try again later.');
    return;
  }
  state.session++; updateTop(); updateBottom('PLAY AGAIN');
}

updateTop();
updateBottom('CLICK TO START');
