const fs = require("fs");

const input = fs.readFileSync('input_13', {encoding: 'utf-8'}).trim().split(/\n/);

earliest = parseInt( input[0] );
IDs = input[1].split(",").filter(x=> x!="x").map(x=> parseInt(x));

wait = 0;
while( IDs.map(x=> (earliest+wait)%x).filter(x=> x==0).length == 0 ){
	wait++;
}

//Parte 1
bus = IDs.filter(x=> (earliest+wait)%x == 0 );
console.log( bus * wait )

//Parte 2 - es t. chino del resto pero lo voy a hacer iterativo a ver que pasa...
delay = [];
schedule = input[1].split(",");
for(i=0; i<schedule.length; i++){
	if(schedule[i]!="x"){delay.push(i);}
}

for(i=0; i<IDs.length; i++){
	delay[i] = (delay[i]%IDs[i] + IDs[i])%IDs[i];
}


t = IDs[0] - delay[0];
m = 1;
for(i=0; i<IDs.length-1; i++){
	m = m*IDs[i];
	next = IDs[i+1];
	while(t%next != (next-delay[i+1])%next){
		t += m;
	}
	if(i+2==IDs.length){m = m*next; break;}
}

while(t-m > 0){t = t-m;}
console.log( t );
