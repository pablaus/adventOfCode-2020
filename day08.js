const fs = require("fs");

const valores = fs.readFileSync('input_08', {encoding: 'utf-8'}).trim().split(/\n/);

programa = [];
for(linea of valores){
	ins = linea.match(/.* /)[0].trim();
	val   = linea.match(/ .*/)[0];
	programa.push([ins, parseInt(val)]);
}

function terminates(instrucciones){
	termina = false;
	acumulador = 0;
	cursor = 0;
	revisadas = new Set();

	while(!revisadas.has(cursor)){
		revisadas.add(cursor);
		instr = instrucciones[cursor][0];
		valo  = instrucciones[cursor][1];
		if(instr=='acc'){acumulador += valo; cursor += 1;}
		if(instr=='jmp'){cursor += valo;}
		if(instr=='nop'){cursor += 1;}
		if(cursor == instrucciones.length){termina=true; cursor=0;}
	}
	return [termina, acumulador];
}

//Parte 1
console.log( terminates(programa) );

//Parte 2
newPrograma = [];
for(i=0; i<programa.length; i++){
	newPrograma.push(programa[i].slice());
}

for(i=0; i<programa.length; i++){

	if(programa[i][0]=='jmp'){
		newPrograma[i][0]='nop';
		if(terminates(newPrograma)[0]){
			console.log( terminates(newPrograma) );
			break;
		}
		newPrograma[i][0]='jmp';
		continue;
	}

	if(programa[i][0]=='nop'){
		newPrograma[i][0]='jmp';
		if(terminates(newPrograma)[0]){
			console.log( terminates(newPrograma) );
			break;
		}
		newPrograma[i][0]='nop';
	}
}

