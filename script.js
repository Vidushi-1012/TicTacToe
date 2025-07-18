const statusDisplay = document.querySelector('.game--status');
const winnerDisplay = document.getElementById('winner-display');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.game--restart');
const resetScoreBtn = document.querySelector('.score--reset');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const scoreDrawDisplay = document.getElementById('score-draw');

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const updateStatus = () => {
  statusDisplay.textContent = `It's Player ${currentPlayer}'s turn`;
  winnerDisplay.textContent = "Let the best player win!";
};

updateStatus();

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', handleRestartGame);
resetScoreBtn.addEventListener('click', handleScoreReset);

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-cell-index');

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  handleResultValidation();
}

function handleResultValidation() {
  let roundWon = false;
  let winningCombo = [];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      winningCombo = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    displayWinner(currentPlayer, winningCombo);
    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    scoreDraw++;
    scoreDrawDisplay.textContent = scoreDraw;
    statusDisplay.textContent = "Game ended in a draw!";
    winnerDisplay.textContent = "It's a Draw!";
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function displayWinner(player, combo) {
  statusDisplay.textContent = `Player ${player} wins!`;
  winnerDisplay.textContent = `🎉 Player ${player} is the Winner!`;

  combo.forEach(index => {
    cells[index].classList.add('win');
  });

  if (player === "X") {
    scoreX++;
    scoreXDisplay.textContent = scoreX;
  } else {
    scoreO++;
    scoreODisplay.textContent = scoreO;
  }
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('win');
  });
  updateStatus();
}

// function handleScoreReset() {
//   scoreX = 0;
//   scoreO = 0;
//   scoreDraw = 0;
//   scoreXDisplay.textContent = "0";
//   scoreODisplay.textContent = "0";
//   scoreDrawDisplay.textContent = "0";
//   winnerDisplay.textContent = "Let the best player win!";
// }
function handleScoreReset() {
  // Reset the scores
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;

  // Update the score displays
  scoreXDisplay.textContent = "0";
  scoreODisplay.textContent = "0";
  scoreDrawDisplay.textContent = "0";

  // Reset winner message
  winnerDisplay.textContent = "Let the best player win!";

  // Restart the game board too
  handleRestartGame(); // <- This line makes it behave like a restart too
}
