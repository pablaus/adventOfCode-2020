const fs = require("fs");

const input = fs.readFileSync('input_17', {encoding: 'utf-8'}).trim().split(/\n/);

cycles = 6;
width = input[0].length + 2*cycles;
height = input.length + 2*cycles;
thick = 1 + 2*cycles;
hyper = 1 + 2*cycles;

function createEmptySpace(){
	E = [];
	for(w=0; w<hyper; w++){
		E.push([]);
		for(z=0; z<thick; z++){
			E[w].push([]);
			for(y=0; y<height; y++){
				E[w][z].push([]);
				for(x=0; x<width; x++){
					E[w][z][y].push('.');
				}
			}
		}
	}
	return E;
}

grid = createEmptySpace();
for(y=0; y<input.length; y++){
	line = input[y];
	for(x=0; x<input[0].length; x++){
		grid[cycles][cycles][y+cycles][x+cycles] = line[x];
	}
}

function isInside(x, y, z, w){
	return (x>=0 && x<width && y>=0 && y<height && z>=0 && z<thick && w>=0 && w<hyper);
}

function countActiveNeighbours(w, z, y, x, gridState){
	actives = 0;
	for(dw=-1; dw<2; dw++){
		for(dz=-1; dz<2; dz++){
			for(dy=-1; dy<2; dy++){
				for(dx=-1; dx<2; dx++){
					if(dx==0 && dy==0 && dz==0 && dw==0){continue;}
					if(!isInside(x+dx, y+dy, z+dz, w+dw)){continue;}
					point = gridState[w+dw][z+dz][y+dy][x+dx];
					if(point=="#"){actives++;}
				}
			}
		}
	}
	return actives;
}

function iterate3d(gridState){
	newGrid = createEmptySpace();

	for(z=0; z<thick; z++){
		for(y=0; y<height; y++){
			for(x=0; x<width; x++){
				acts = countActiveNeighbours(cycles, z, y, x, gridState);
				if(gridState[cycles][z][y][x]=="#" && (acts==2 || acts==3)){
					newGrid[cycles][z][y][x] = '#';
				}
				if(gridState[cycles][z][y][x]=="." && acts==3){
					newGrid[cycles][z][y][x] = "#";
				}
			}
		}
	}
	return newGrid;
}


function countActives(gridState){
	return gridState.flat().flat().flat().filter(x=> x=='#').length;
}

//Parte 1
nextGrid = iterate3d(grid);
for(i=2; i<=6; i++){
	nextGrid = iterate3d(nextGrid);
}
console.log( countActives(nextGrid) );

//Parte 2
function iterate4d(gridState){
	newGrid = createEmptySpace();
	for(w=0; w<hyper; w++){
		for(z=0; z<thick; z++){
			for(y=0; y<height; y++){
				for(x=0; x<width; x++){
					acts = countActiveNeighbours(w, z, y, x, gridState);
					if(gridState[w][z][y][x]=="#" && (acts==2 || acts==3)){
						newGrid[w][z][y][x] = '#';
					}
					if(gridState[w][z][y][x]=="." && acts==3){
						newGrid[w][z][y][x] = "#";
					}
				}
			}
		}
	}
	return newGrid;
}

nextGrid = iterate4d(grid);
for(i=2; i<=6; i++){
	nextGrid = iterate4d(nextGrid);
}

console.log( countActives(nextGrid) );

