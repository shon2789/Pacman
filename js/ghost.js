'use strict'
const GHOST = '⚗︎';

var gGhosts = []
var gIntervalGhosts;


function createGhost(board, currCell = FOOD) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: currCell,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST

}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver();
        document.querySelector('.modal span').innerText = 'You Lost!'
        document.querySelector('.modal').style.backgroundColor = 'red';
        renderCell(gPacman.location, EMPTY)
        return;
    }

    if (gPacman.isSuper) {
        ghost.color = 'red';
        setTimeout(function () {
            var cell33 = gBoard[3][3];
            while (gGhosts.length !== 3) {
                createGhost(gBoard, cell33);
            }
            ghost.color = getRandomColor();
        }, 5000);
    }


    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost, ghost.color))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost, color) {
    return `<span style="color:${color};">${GHOST}</span>`
}

