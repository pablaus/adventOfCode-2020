const fs = require("fs");

const input = fs.readFileSync('input_11', {encoding: 'utf-8'}).trim().split(/\n/);

grid = [];
height = input.length;
width = input[0].length;

for(row=0; row<height; row++){
	line = input[row];
	grid.push([]);
	for(column=0; column<width; column++){
		grid[row].push(line[column]);
	}
}

function isInside(row, col){
	return (row>=0 && row<height && col>=0 && col<width);
}

function countNeighbours(row, col, gridState){
	empty = 0;
	occup = 0;
	for(dy=-1; dy<2; dy++){
		for(dx=-1; dx<2; dx++){
			if(dx==0 && dy==0){continue;}
			if(!isInside(row+dy, col)){continue;}
			if(!isInside(row, col+dx)){continue;}

			point = gridState[row+dy][col+dx];
			if(point=="#"){occup++;}
			if(point=="L"){empty++;}
		}
	}
	return [empty, occup]
}

function iterate(gridState){
	newGrid = new Array();
	for(i=0; i<height; i++){newGrid.push( gridState[i].slice() );}

	for(row=0; row<height; row++){
		for(col=0; col<width; col++){
			if(gridState[row][col]=="L" && countNeighbours(row, col, gridState)[1]==0){
				newGrid[row][col] = '#';
			}
			if(gridState[row][col]=="#" && countNeighbours(row, col, gridState)[1]>=4){
				newGrid[row][col] = 'L';
			}
		}
	}
	return newGrid;
}


function countOccup(gridState){
	return gridState.flat().filter(x=> x=='#').length;
}


//Part 1
nextGrid = iterate(grid);
while(nextGrid.flat().toString() != iterate(nextGrid).flat().toString()){
	nextGrid = iterate(nextGrid);
}

console.log( countOccup(nextGrid) )

//Part 2
function countVisibleNeighbours(row, col, gridState){
	empty = 0;
	occup = 0;
	for(dy=-1; dy<2; dy++){
		for(dx=-1; dx<2; dx++){
			if(dx==0 && dy==0){continue;}
			cr = row+dy;
			cc = col+dx;
			while(isInside(cr, cc)){
				point = gridState[cr][cc];
				if(point=="#"){occup++; break;}
				if(point=="L"){empty++; break;}
				cr += dy;
				cc += dx;
			}
		}
	}
	return [empty, occup]
}

function iterateVisible(gridState){
	newGrid = new Array();
	for(i=0; i<height; i++){newGrid.push( gridState[i].slice() );}

	for(row=0; row<height; row++){
		for(col=0; col<width; col++){
			if(gridState[row][col]=="L" && countVisibleNeighbours(row, col, gridState)[1]==0){
				newGrid[row][col] = '#';
			}
			if(gridState[row][col]=="#" && countVisibleNeighbours(row, col, gridState)[1]>=5){
				newGrid[row][col] = 'L';
			}
		}
	}
	return newGrid;
}

nextGrid = iterateVisible(grid);
while(nextGrid.flat().toString() != iterateVisible(nextGrid).flat().toString()){
	nextGrid = iterateVisible(nextGrid);
}

console.log( countOccup(nextGrid) )
