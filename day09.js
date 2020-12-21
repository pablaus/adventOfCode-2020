const fs = require("fs");

const valores = fs.readFileSync('input_09', {encoding: 'utf-8'}).trim().split(/\n/);

numeros = [];
for(linea of valores){
	numeros.push(parseInt(linea));
}

preamble = 25;
function validateIndex(n){
	if(n<preamble){return true;}

	num = numeros[n];

	set = new Set();
	lis = numeros.slice(n-preamble, n);
	for(i=0; i<lis.length-1; i++){
		for(j=i+1; j<lis.length; j++){
			set.add(lis[i]+lis[j]);
		}
	}
	return set.has(num);
}

k=0;
while(validateIndex(k) || k==numeros.length){
	k++;
}


//Parte 1
target = numeros[k];
console.log( target );


//Parte 2
for(l=2; l<numeros.length; l++){
	for(i=0; i<numeros.length-l; i++){
		suma = numeros.slice(i,i+l).reduce((a, b) => a + b, 0);
		if(suma==target){break;}
	}
	
	if(suma==target){
		m = Math.min( ...numeros.slice(i,i+l) );
		M = Math.max( ...numeros.slice(i,i+l) )
		console.log( m+M );
		break;
	}
}

