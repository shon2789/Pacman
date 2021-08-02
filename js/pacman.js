'use strict'
const PACMAN = '😮';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === FOOD) {
        updateScore(1);
        console.log('Score from FOOD: ', gGame.score)
    }
    if (nextCell === SUPER_FOOD && gPacman.isSuper) return;
    if (nextCell === WALL) return;

    if (nextCell === GHOST && !gPacman.isSuper) {
        document.querySelector('.modal span').innerText = 'You Lost!'
        document.querySelector('.modal').style.backgroundColor = 'red';
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }

    if (nextCell === SUPER_FOOD) {
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;
        }, 5000)
    }

    if (gPacman.isSuper && nextCell === GHOST) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                if (gGhosts[i].currCellContent === FOOD) {
                    updateScore(1);
                    console.log('Score from ghost: ', gGame.score)
                }

                gGhosts.splice(i, 1);
                break;
            }
        }
    }

    if (nextCell === CHERRY) {
        updateScore(10);
        gNumOfFood += 10;
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}