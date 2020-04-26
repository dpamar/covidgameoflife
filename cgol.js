const Colors = {
    ALIVE: 'purple',
    DEAD: 'lightgreen'
}
const Modes = {
    ORIGINAL: 'original',
    COVID: 'covid'
}

var board = null;
var width = null;
var height = null;

function createNewBoard(boardWidth, boardHeight, divId) {
    var target = document.getElementById(divId);
    var code = ['<table>'];
    board = [];
    width = boardWidth;
    height = boardHeight;
    for(var i = 0; i < height; i++) {
        var newRow = [];
        code.push('<tr>');
        for(var j=0; j < width; j++) {
            newRow.push(0);
            code.push(`<td onclick="switchState(${j}, ${i})" id="cell_${j}_${i}" style="width: 10px; height: 10px; overflow: hidden; background-color: ${Colors.DEAD}"></td>`);
        }
        code.push('</tr>');
        board.push(newRow);
    }
    code.push('</table>');
    target.innerHTML = code.join('');
}

function switchState(x, y) {
    board[y][x] = 1-board[y][x];
    redraw(x, y, board[y][x]);
}

function redraw(x, y, state) {
    var target = document.getElementById(`cell_${x}_${y}`);
    if(target) target.style.backgroundColor = state == 1 ? Colors.ALIVE : Colors.DEAD;
}

function moveNext() {
    for(var i = 0; i < height; i++) {
        for(var j=0; j < width; j++) {
            if(mode == Modes.ORIGINAL) {
                var count = 0;
                for(var y = i-1; y <= i+1; y++) {
                    if( y < 0 || y >= height) continue;
                    for(var x = j-1; x <= j+1; x++) {
                        if( x < 0 || x >= this.width) continue;
                        if(board[y][x] & 1) count++;
                    }
                }
                if(board[i][j]) count--;
                if(count == 3) board[i][j] |= 2;
                else if(count == 2) board[i][j] *= 3;
            }
            else {
                var immediateCount = 0;
                var distancingCount = 0
                for(var y = i-1; y <= i+1; y++) {
                    if( y < 0 || y >= height) continue;
                    for(var x = j-1; x <= j+1; x++) {
                        if( x < 0 || x >= this.width) continue;
                        if(board[y][x] & 1) immediateCount++;
                    }
                }
                for(var y = i-2; y <= i+2; y++) {
                    if( y < 0 || y >= height) continue;
                    for(var x = j-2; x <= j+2; x++) {
                        if( x < 0 || x >= this.width) continue;
                        if(board[y][x] & 1) distancingCount++;
                    }
                }
                if(board[i][j]) {
                    immediateCount--;
                    distancingCount--;
                }

                //More than one immediate neighbour : increased risk of infection
                if(immediateCount > 1) continue;
                //3 to 5 far neighbours : alive (equivalent to 3 neighbours in regular game)
                if(distancingCount >= 3 && distancingCount <= 5) board[i][j] |= 2;
                //2 far neighbours : same state (equivalent to 2 neighbours in regular game)
                else if(distancingCount == 2) board[i][j] *= 3;

            }
        }
    }
    for(var i = 0; i < this.height; i++) {
        for(var j=0; j < this.width; j++) {
            switch(board[i][j]) {
                case 1:
                case 2:
                    redraw(j, i, board[i][j] >> 1);
                    break;
            }
            board[i][j] >>= 1;
        }
    }
}