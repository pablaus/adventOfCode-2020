const fs = require("fs");

const input = fs.readFileSync('input_12', {encoding: 'utf-8'}).trim().split(/\n/);

instructions = [];
for(instr of input){
	instructions.push( [instr[0], parseInt(instr.slice(1,))]);
}


function nextCoord(coordinate, instruction){
	ins = instruction[0];
	num = instruction[1];

	position = coordinate[0];
	orientation = coordinate[1]%360;
	orientation = (orientation%360+360)%360;

	if(ins == 'N'){position[0] -= num;}
	if(ins == 'S'){position[0] += num;}
	if(ins == 'E'){position[1] -= num;}
	if(ins == 'W'){position[1] += num;}
	if(ins == 'L'){orientation += num;}
	if(ins == 'R'){orientation -= num;}
	if(ins == 'F'){
		if(orientation == 0  ){position[0] += num;} //south
		if(orientation == 90 ){position[1] -= num;} //east
		if(orientation == 180){position[0] -= num;} //north
		if(orientation == 270){position[1] += num;} //west
	}
	
	return([position, orientation])
}


//Part 1
coord = [[0,0], 90];
for(instr of instructions){
	coord = nextCoord(coord, instr);
}

console.log( Math.abs(coord[0][0])+Math.abs(coord[0][1]) );


//Part 2
ship = [0,0];
waypoint = [-10, -1];

function nextWaypoint(waypoint, instruction){
	ins = instruction[0];
	num = instruction[1];

	x = waypoint[0];
	y = waypoint[1];
	angle = 0;

	if(ins == 'N'){y -= num;}
	if(ins == 'S'){y += num;}
	if(ins == 'E'){x -= num;}
	if(ins == 'W'){x += num;}
	if(ins == 'L'){ angle = -(num%360+360)%360 * Math.PI/180;}
	if(ins == 'R'){ angle = (num%360+360)%360 * Math.PI/180;}

	[x,y] = [ Math.cos(angle)*x + Math.sin(angle)*y , -Math.sin(angle)*x + Math.cos(angle)*y ];
	
	return([Math.round(x), Math.round(y)]);
}

pos= [0, 0];
wp = [-10, -1];
for(instr of instructions){
	if(instr[0] == 'F'){
		pos[0] += instr[1]*wp[0];
		pos[1] += instr[1]*wp[1];
	}
	wp = nextWaypoint(wp, instr);
}

console.log( Math.abs(pos[0])+Math.abs(pos[1]) );
