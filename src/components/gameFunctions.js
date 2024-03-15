// gameFunctions.js

let timerInterval;
let gameTimer = 0;
let ballSpeed = 1;
let playerAScore = 0;
let playerBScore = 0;

// Function to start the game timer
export const startTimer = () => {
  timerInterval = setInterval(() => {
    gameTimer++;
    // Additional logic if needed
  }, 1000);
};

// Function to pause the game timer
export const pauseTimer = () => {
  clearInterval(timerInterval);
};

// Function to reset the game state
export const resetGame = () => {
  gameTimer = 0;
  ballSpeed = 1;
  playerAScore = 0;
  playerBScore = 0;
};

// Function to reset the game timer
export const resetTimer = () => {
  gameTimer = 0;
};

// Function to increase the ball speed
export const increaseBallSpeed = () => {
  ballSpeed += 0.5;
};

// Function to decrease the ball speed
export const decreaseBallSpeed = () => {
  if (ballSpeed > 0.5) {
    ballSpeed -= 0.5;
  }
};

// Function to increase the player score
export const increaseScore = (player) => {
  if (player === 'A') {
    playerAScore++;
  } else if (player === 'B') {
    playerBScore++;
  }
};
