var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  moves = 0;

function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

function startNewGame() {
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

function win() {
  return (boxes[0].innerHTML == turn && boxes[1].innerHTML == turn && boxes[2].innerHTML == turn) ||
 		(boxes[3].innerHTML == turn && boxes[4].innerHTML == turn && boxes[5].innerHTML == turn) ||
 		(boxes[6].innerHTML == turn && boxes[7].innerHTML == turn && boxes[8].innerHTML == turn) ||
 		(boxes[0].innerHTML == turn && boxes[3].innerHTML == turn && boxes[6].innerHTML == turn) ||
 		(boxes[1].innerHTML == turn && boxes[4].innerHTML == turn && boxes[7].innerHTML == turn) ||
 		(boxes[2].innerHTML == turn && boxes[5].innerHTML == turn && boxes[8].innerHTML == turn) ||
		(boxes[0].innerHTML == turn && boxes[4].innerHTML == turn && boxes[8].innerHTML == turn) ||
		(boxes[2].innerHTML == turn && boxes[4].innerHTML == turn && boxes[6].innerHTML == turn);
}

function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  if (win()) {
    alert('Winner: turn ' + turn);
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert('Draw');
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'turn ' + turn;
  }
}

init();