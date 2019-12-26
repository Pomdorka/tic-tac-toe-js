var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  parentTable,
  moves = 0;

function init() {
  parentTable = document.createElement('table');
  
  parentTable.setAttribute('border', 1);
  parentTable.setAttribute('cellspacing', 0);

  for (var pi = 0; pi < N_SIZE; pi++) {
    var parentRow = document.createElement('tr');
    parentTable.appendChild(parentRow);
    for (var pj = 0; pj < N_SIZE; pj++) {
      var parentCell = document.createElement('td');
      parentCell.classList.add("parentTd", 'pi' + pi, 'pj' + pj, "enabled");
      //parentCell.addEventListener('click', clickEvent);
      parentRow.appendChild(parentCell);

	  var table = document.createElement('table');
	  for (var i = 0; i < N_SIZE; i++) {
		var row = document.createElement('tr');
		table.appendChild(row);
		for (var j = 0; j < N_SIZE; j++) {
		  var cell = document.createElement('td');
		  cell.classList.add("childTd", 'i' + i, 'j' + j);
		  cell.addEventListener('click', clickEvent);
		  row.appendChild(cell);
		}
	  }
	  parentCell.appendChild(table);
    }
  }
  document.getElementById('tictactoe').appendChild(parentTable);
  startNewGame();
}

function startNewGame() {
  moves = 0;
  turn = 'X';
  Array.from(document.getElementsByClassName("childTd")).forEach(function (childTd) {
    childTd.innerHTML = EMPTY;
  });
}

function win(table) {
    //console.log(table.rows[0].cells[0]);
  return (table.rows[0].cells[0].innerHTML == turn && table.rows[0].cells[1].innerHTML == turn && table.rows[0].cells[2].innerHTML == turn) ||
 	     (table.rows[1].cells[0].innerHTML == turn && table.rows[1].cells[1].innerHTML == turn && table.rows[1].cells[2].innerHTML == turn) ||
 		 (table.rows[2].cells[0].innerHTML == turn && table.rows[2].cells[1].innerHTML == turn && table.rows[2].cells[2].innerHTML == turn) ||
 		 (table.rows[0].cells[0].innerHTML == turn && table.rows[1].cells[0].innerHTML == turn && table.rows[2].cells[0].innerHTML == turn) ||
 		 (table.rows[0].cells[1].innerHTML == turn && table.rows[1].cells[1].innerHTML == turn && table.rows[2].cells[1].innerHTML == turn) ||
 		 (table.rows[0].cells[2].innerHTML == turn && table.rows[1].cells[2].innerHTML == turn && table.rows[2].cells[2].innerHTML == turn) ||
		 (table.rows[0].cells[0].innerHTML == turn && table.rows[1].cells[1].innerHTML == turn && table.rows[2].cells[2].innerHTML == turn) ||
		 (table.rows[0].cells[2].innerHTML == turn && table.rows[1].cells[1].innerHTML == turn && table.rows[2].cells[0].innerHTML == turn);
}

function clickEvent() {
    //console.log(turn);
  if (this.innerHTML !== EMPTY) {
    return;
  }
  if (this.parentNode.parentNode.parentNode.classList.contains("disabled")){
      return;
  }
  
  
  
  
  //console.log(pi + ' ' + pj);
 
  //console.log('after: ' + parentTd.classList);
    this.innerHTML = turn;
    if (win(this.parentNode.parentNode)){
        this.parentNode.parentNode.parentNode.innerHTML = turn;
    }
    if (win(parentTable)){
        alert("win: " + turn);
        startNewGame();
    }
    
    
    
    
    var pi, pj;
      var memberOf = this.className.split(/\s+/);
      for (var k = 0; k < memberOf.length; k++){
          if (memberOf[k].startsWith('i')){
              pi = 'pi' + memberOf[k].substr(1);
          }
          if (memberOf[k].startsWith('j')){
              pj = 'pj' + memberOf[k].substr(1);
          } 
      }
      var isTargetCompleted = document.getElementsByClassName(pi + " " + pj)[0].innerHTML.length == 1;
    
    Array.from(document.getElementsByClassName("parentTd")).forEach(function (parentTd) {
     //console.log('before: ' + parentTd.classList);
     if (parentTd.innerHTML.length > 1 && ((parentTd.classList.contains(pi) && parentTd.classList.contains(pj)) || isTargetCompleted)){
         parentTd.classList.add("enabled");
         parentTd.classList.remove("disabled");
     } else {
         parentTd.classList.add("disabled");
         parentTd.classList.remove("enabled");
     } 
     //console.log('after: ' + parentTd.classList);
    });
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'turn ' + turn;
}

init();