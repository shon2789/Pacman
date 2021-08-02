'use strict'
const WALL = '⬛️'
const FOOD = '●'
const EMPTY = ' ';
const SUPER_FOOD = '🍔';
const CHERRY = '🍒';

var cherryInterval;
// var emptyCells;
// console.log(emptyCells);
var gNumOfFood = 0;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}


function init() {
    resetGame();
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    document.querySelector('.modal').style.display = 'none';
    cherryInterval = setInterval(createCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gNumOfFood++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gNumOfFood--;
            } else if (i === 1 && j === 1 || i === 8 && j === 1 || i === 1 && j === 8 || i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD;
                gNumOfFood--;
            }
        }
    }
    // board[1][1] = SUPER_FOOD;
    // board[8][1] = SUPER_FOOD;
    // board[1][8] = SUPER_FOOD;
    // board[8][8] = SUPER_FOOD;
    gNumOfFood--;
    // gNumOfFood -= 4;
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === gNumOfFood) {
        document.querySelector('.modal span').innerText = 'You Won!'
        document.querySelector('.modal').style.backgroundColor = 'green';
        gameOver();
    }
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    document.querySelector('.modal').style.display = 'inline-block'
    clearInterval(gIntervalGhosts);
    clearInterval(cherryInterval);

}

function resetGame() {
    gBoard = null;
    gGame.score = 0;
    gNumOfFood = 0;
    clearInterval(gIntervalGhosts);
}


function createCherry() {
    var availableCells = [];

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] !== GHOST && gBoard[i][j] !== PACMAN && gBoard[i][j] !== SUPER_FOOD && gBoard[i][j] !== WALL && gBoard[i][j] !== FOOD) {
                availableCells.push({ i, j });
            }
        }
        var availableCell = { i, j };
        availableCells.push(availableCell);

        var randIdx = Math.floor(Math.random() * availableCells.length);
    }
    gBoard[availableCells[randIdx].i][availableCells[randIdx].j] = CHERRY;
    renderCell(availableCells[randIdx], CHERRY);

}