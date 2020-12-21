const fs = require("fs");

const valores = fs.readFileSync('input_05', {encoding: 'utf-8'}).trim().split(/\n/);


function rowCalc(letras){
	row = 0;
	for(i=0; i<7; i++){
		if(letras[i]=='B'){ row += (2**(6-i)); }
	}
	return row;
}

function seatCalc(letras){
	seat = 0;
	for(i=7; i<10; i++){
		if(letras[i]=='R'){ seat += (2**(9-i)); }
	}
	return seat;
}

function seatID(letras){
	return (8*rowCalc(letras) + seatCalc(letras))
	}

//Parte 1
maximo = 0;
for(x of valores){
	maximo = Math.max(maximo, seatID(x));
}

console.log( maximo );


//Parte 2
IDSvalidos = new Set();
minimo = 99999;
for(x of valores){
	if(rowCalc(x)==0 || rowCalc(x)==127){continue;}
	IDSvalidos.add(seatID(x));
	minimo = Math.min(minimo, seatID(x));
}
target = minimo;
while(IDSvalidos.has(target+1)){target+=1;}

console.log( target+1 );
