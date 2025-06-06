let canvas = document.querySelector('#canvas');

let context;

context = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let playerX = 0;
let playerY = 375;

let player2X = 375;
let player2Y = 0;

const blockSize = 25;

function update() {
  if (playerX === player2X && playerY === player2Y) {
    console.log('Game over');
    clearInterval(updateGame);
  }

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'red';
  context.fillRect(playerX, playerY, blockSize, blockSize);

  context.fillStyle = 'green';
  context.fillRect(player2X, player2Y, blockSize, blockSize);
}

let isJumping = false;

let jumpingSpeed = 100;

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
  if (e.code === 'ArrowRight') {
    moveRight();
  }
  if (e.code === 'ArrowLeft') {
    moveLeft();
  }
});

let updateGame = setInterval(update, 20);

function moveRight() {
  playerX += blockSize;
  if (playerX === canvas.width) {
    playerX = 0;
  }
}

function moveLeft() {
  playerX -= blockSize;
  if (playerX === -25) {
    playerX = canvas.width - blockSize;
  }
}

function movePlayer2() {
  let movePlayer2Timer = setInterval(() => {
    player2Y += 5;
    if (player2Y === canvas.height - blockSize) {
      clearInterval(movePlayer2Timer);
      let movePlayer2TimerUp = setInterval(
        () => {
          player2Y -= 5;
          if (player2Y === 0) {
            clearInterval(movePlayer2TimerUp);
            movePlayer2();
          }
        },

        100
      );
    }
  }, 100);
}

movePlayer2();

function jump() {
  if (!isJumping) {
    isJumping = true;
    let counting = 0;
    let timerID = setInterval(() => {
      counting++;
      playerY -= 5;
      if (counting === 10) {
        clearInterval(timerID);
        let fallingTimerId = setInterval(() => {
          counting--;
          playerY += 5;
          if (playerY === 375) {
            clearInterval(fallingTimerId);
            isJumping = false;
          }
        }, jumpingSpeed);
      }
    }, jumpingSpeed);
  }
}

update();
