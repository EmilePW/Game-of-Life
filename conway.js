var alive = [];

function Cell (x, y) {
  this.x = x;
  this.y = y;
}

// Check if a cell is alive
function isAlive (cell) {
  for( var i = 0; i < alive.length; i++ ) {
  	// Check if coordinates are in the set of alive cell coordinate pairs
  	if( alive[i].x === cell.x && alive[i].y === cell.y ) {
  	  return true;
  	}
  }

  return false;
}

function findAliveNeighbours(cell) {
  var numAliveNeigbours = 0;

  // For each alive cell, loop through the neighbours of
  // the cell to see if it is a neighbour
  for(var i = 0; i < alive.length; i++) {
  	for(var j = cell.x - 1; j < cell.x + 1; j++) {
  	  for(var k = cell.y - 1; k < cell.y + 1; k++) {
  	  	if(alive[i].x === j && alive[i].y === k) {
  	  	  numAliveNeigbours++;
  	  	}
  	  }
  	}
  }

  return numAliveNeigbours;
}

// Cell dies when removed from alive array
function cellDeath(cell) {
  for(var i = 0; i < alive.length; i++) {
    if( alive[i].x === cell.x && alive[i].y === cell.y ) {
  	  alive.splice(i, 1);
    }
  }
}

// Bring a dead cell to life
function bringToLife(cell) {
  alive.push(cell);
  return alive;
}

function updateCell(cell) {
  if( findAliveNeighbours(cell) < 2 || findAliveNeighbours(cell) > 3 ) {
  	cellDeath(cell);
  }
  else if( findAliveNeighbours(cell) === 3 && !isAlive(cell) ) {
  	bringToLife(cell);
  }
  else {
  	// Do nothing if alive cell has two or three neighbours
  } 
}

function makeWorld() {
  
}

/* TESTS */

// Simple test for alive cell
console.log('Check if cell is alive: ' + (function() {
  alive.push(new Cell(0,0));

  return isAlive(new Cell(0, 0));
}() ? 'Passed' : 'Failed'));

// Simple test for two set neighbours
console.log('Check if has two neighbours: ' + (function() {
  alive = [];

  var cell = new Cell(1,1);

  alive.push(new Cell(1,2));
  alive.push(new Cell(0, 1));

  return findAliveNeighbours(cell) === 2;
}() ? 'Passed' : 'Failed'));

// Simple test to check whether cell dies
console.log('Check if cell dies: ' + (function() {
  alive = [];

  var cell = new Cell(1, 3);

  alive.push(cell);

  cellDeath(cell);

  return alive.length === 0;
}() ? 'Passed' : 'Failed'));

// Simple test to check whether cell is brought to life
console.log('Check if cell is brought to life: ' + (function() {
  alive = [];

  var cell = new Cell(1, 3);

  bringToLife(cell);

  return alive.length === 1;
}() ? 'Passed' : 'Failed'));

console.log('Check if cell dies when it has less than two alive neighbours: ' + (function() {
  alive = [];

  var cell = new Cell(1, 1);

  bringToLife(cell);

  updateCell(cell);

  return alive.length === 0;
}() ? 'Passed' : 'Failed'));

console.log('Check if cell dies when it has more than three alive neighbours: ' + (function() {
  alive = [new Cell(1, 2), new Cell(0, 1), new Cell(2, 1), new Cell(0, 0)];

  var cell = new Cell(1, 1);

  bringToLife(cell);

  updateCell(cell);

  return alive.length === 5;
}() ? 'Passed' : 'Failed'));

