var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  parentTable,
  moves = 0;

function randomTurn() {
    var parentArr = [];
    var childArr = [];
    Array.from(document.getElementsByClassName("parentTd enabled")).forEach(function (parentTd) {
        parentArr.push(parentTd);
    });
    parentTd = parentArr[Math.floor(Math.random() * parentArr.length)];
    console.log("randomTurn: parentArr: " + parentArr + ', parentTd: ' + parentTd.classList);
    Array.from(parentTd.getElementsByTagName("td")).forEach(function (td) {
        if (td.innerHTML == EMPTY)
        childArr.push(td);
    });
    childTd = childArr[Math.floor(Math.random() * childArr.length)];
    console.log("randomTurn: childArr: " + childArr + ', childTd: ' + childTd.classList);
    return childTd;
    //min = Math.ceil(min);
    //max = Math.floor(max);
    //return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function draw (table){
    //console.log('draw: table = ' + table.parentNode.classList);
    var isDraw = true;
    Array.from(table.getElementsByTagName("td")).forEach(function (td) {
        console.log('  draw: td= ' + td.classList);
        if (td.innerHTML == EMPTY || td.getElementsByTagName("table")){
            console.log('  draw: false, td= ' + td);
            isDraw = false;
        }
    });
    //console.log('draw: true, table = ' + table.parentNode.classList);
    return isDraw;
}

function clickEvent() {
    handleClick(this)
}

function handleClick(childTd) {
    var parentTd = childTd.parentNode.parentNode.parentNode
    //console.log("handleClick: childTd=" + childTd.classList + ", parentTd=" + parentTd.classList + ', turn: ' + turn);
  if (childTd.innerHTML !== EMPTY) {
   // console.log("handleClick: not empty");
    return;
  }
  if (parentTd.classList.contains("disabled")){
   // console.log("handleClick: disabled");
      return;
  }
  


    childTd.innerHTML = turn;
    if (win(childTd.parentNode.parentNode)){
        parentTd.innerHTML = turn;
    } else if(draw(childTd.parentNode.parentNode)) {
        parentTd.innerHTML = "-";
    }
    if (win(parentTable)){
        alert("win: " + turn);
        startNewGame();
    }
        
    var pi, pj;
      var memberOf = childTd.className.split(/\s+/);
      for (var k = 0; k < memberOf.length; k++){
          if (memberOf[k].startsWith('i')){
              pi = 'pi' + memberOf[k].substr(1);
          }
          if (memberOf[k].startsWith('j')){
              pj = 'pj' + memberOf[k].substr(1);
          } 
      }
    //console.log("handleClick: pi=" + pi + ', pj=' + pj);
    var isTargetCompleted = document.getElementsByClassName(pi + " " + pj)[0].innerHTML.length == 1;
    
    Array.from(document.getElementsByClassName("parentTd")).forEach(function (parentTd) {
     
     if (parentTd.innerHTML.length > 1 && ((parentTd.classList.contains(pi) && parentTd.classList.contains(pj)) || isTargetCompleted)){
         parentTd.classList.add("enabled");
         parentTd.classList.remove("disabled");
     } else {
         parentTd.classList.add("disabled");
         parentTd.classList.remove("enabled");
     }
    });
    
    if (turn === 'X'){
        turn = 'O';
        var td = randomTurn();
        handleClick(td);
        td.style = "animation: blinking 1s";
    } else {
        turn = 'X';
    }
    document.getElementById('turn').textContent = 'turn ' + turn;
    //turn = turn === 'X' ? 'O' : 'X';
}

init();