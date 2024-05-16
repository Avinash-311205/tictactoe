const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-cell-index');

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            status.textContent = `${gameState[a]} wins!`;
            gameActive = false;
            return;
        }
    }
}

function checkDraw() {
    if (!gameState.includes('') && gameActive) {
        status.textContent = "It's a draw!";
        gameActive = false;
    }
}

function handleRestart() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    status.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestart);
