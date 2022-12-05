// selezione canvas
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

// tenere traccia di quali pulsanti l'utente premerà
const keys = [];

// contenere tutti i data del personaggio
const player = {
  x: 200,
  y: 300,
  width: 64,
  height: 64,
  frameX: 0,
  frameY: 0,
  speed: 9,
  moving: false,
};

// immagine player
const playerSprite = new Image();
playerSprite.src = "pikachu.png";

// background canvas
const background = new Image();
background.src = "background.png";
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// funzioni per il keydown event

window.addEventListener("keydown", function (e) {
  console.log(e);
  keys[e.keyCode] = true;
  player.moving = true;

  //qualsiasi pulsante viene premuto viene aggiunto all'array
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  player.moving = false; //togliere quei pulsanti dall'array
});

//funzione per muovere il personaggio
function movePlayer() {
  if (keys[38] && player.y > 0) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys[37] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keys[40] && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys[39] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

// funzione per il movimento del pg
function handlePlayerFrame() {
  if (player.frameX < 3 && player.moving) player.frameX++;
  else player.frameX = 0;
}

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//   drawSprite(
//     playerSprite,
//     player.width * player.frameX,
//     player.height * player.frameY,
//     player.width,
//     player.height,
//     player.x,
//     player.y,
//     player.width,
//     player.height
//   );
//   movePlayer();
//   handlePlayerFrame();
//   requestAnimationFrame(animate);
// }

// animate();

// funzione per ottimizzare il framerate in base alle macchine usate
let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    handlePlayerFrame();
  }
}

startAnimating(15);
