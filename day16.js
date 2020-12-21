const fs = require("fs");

const input = fs.readFileSync('input_16', {encoding: 'utf-8'}).trim().split(/\n/);

//rules
rules = new Object();
allLimits = new Array();
readIdx = 0;
for(readIdx; readIdx<input.length; readIdx++){
	line = input[readIdx];
	if(line==''){break;}

	field = line.split(": ")[0];
	rules[field]=[];

	for(values of line.split(": ")[1].split(" or ")){
		min = parseInt(values.split("-")[0]);
		max = parseInt(values.split("-")[1]);
		rules[field].push( [min, max] );
		allLimits.push( [min, max] );
	}
}

//yourTicket
readIdx+=2;
line = input[readIdx];
yourTicket = line.split(",").map( x=> parseInt(x) );


//nearbyTickets
readIdx+=3;
nearbyTickets = new Array();
for(readIdx; readIdx<input.length; readIdx++){
	line = input[readIdx];
	nearbyTickets.push( line.split(",").map( x=> parseInt(x) ) );
}


function isInAnyLimit(N){
	for(limit of allLimits){
		if(N>=limit[0] && N<=limit[1]){return true;}
	}
	return false;
}


function ticketErrorRate(ticket){
	errRate = 0;
	for(number of ticket){
		if(!isInAnyLimit(number)){errRate+=number;}
	}
	return errRate;
	
}

//Part 1
errorRate = 0;
for(ticket of nearbyTickets){
	errorRate += ticketErrorRate(ticket);	
}

console.log( errorRate );


//Part 2
validTickets = nearbyTickets.filter(x => ticketErrorRate(x)==0);
validTickets.push( yourTicket );

fieldNumbers = [];
for(i=0; i<yourTicket.length; i++){
	fieldNumbers.push( [] );
	for(ticket of validTickets){
		fieldNumbers[i].push( ticket[i] );
	}
}

function numbersCanBeOfField(numbers, field){
	for(N of numbers){
		isInLimits = false;
		for(limit of rules[field]){
			isInLimits = isInLimits || (N>=limit[0] && N<=limit[1]);
		}
		if(!isInLimits){return false;}
	}
	return true;
}

fieldsIndexes = new Object();
availableFields = new Set(Object.keys(rules))
availableIndexes = new Set(); for(i=0; i<yourTicket.length; i++){ availableIndexes.add(i);}
while(availableFields.size > 1 ){ //Esto no funcionó con ">0" y no tengo idea por qué

	for(field of availableFields){
		compatibles = 0;
		wichOne = -1;
		for(i of availableIndexes){
			if( numbersCanBeOfField(fieldNumbers[i], field) ){
				compatibles+=1;
				wichOne=i;
			}
		}

		if(compatibles==1){
			availableFields.delete(field);
			availableIndexes.delete(wichOne);
			fieldsIndexes[field]=wichOne; break;
		}

	}

	for(i of availableIndexes){
		compatibles = 0;
		wichOne = '';
		for(field of availableFields){
			if( numbersCanBeOfField(fieldNumbers[i], field) ){
				compatibles+=1;
				wichOne=field;
			}
		}

		if(compatibles==1){
			availableFields.delete(wichOne);
			availableIndexes.delete(i);
			fieldsIndexes[wichOne]=i; break;
		}

	}
}

console.log(fieldsIndexes);

result = 1;
for(key of Object.keys(fieldsIndexes)){
	i = fieldsIndexes[key];
	if(key.match(/departure.*/)){result *= yourTicket[i]; }
}

console.log(result);




