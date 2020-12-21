const fs = require("fs");

const valores = fs.readFileSync('input_10', {encoding: 'utf-8'}).trim().split(/\n/);

adaptadores = [];
for(linea of valores){
	adaptadores.push(parseInt(linea));
}

function adaptadoresCompatibles(jolts, listaAdaptadores){
	return listaAdaptadores.filter( adaptador => (adaptador >= jolts+1 && adaptador <= jolts+3) );
}


function diferenciasDeJolts(n, cadena){
	contador = 0;
	for(i=0; i<cadena.length-1; i++){
		if(cadena[i+1]-cadena[i]==n){contador++;}
	}
	return contador;
}

//Buen ejemplo para hacer una especie de backtracking
function calcularCadenaMasLarga(inicial, adaptadoresRestantes){

	if(adaptadoresCompatibles(inicial, adaptadoresRestantes).length==0){return [inicial];}
	var masLarga = [];

	for(adaptador of adaptadoresCompatibles(inicial, adaptadoresRestantes)){
		quitarAdaptador = adaptadoresRestantes.filter(x => (x != adaptador));
		cadena = calcularCadenaMasLarga(adaptador, quitarAdaptador);

		if(cadena.length > masLarga.length){
			masLarga=cadena;
		}
	}
	return [inicial].concat(masLarga);
}


function calcularNumeroDeCombinaciones(inicial, adaptadoresRestantes){
	if(adaptadoresCompatibles(inicial, adaptadoresRestantes).length==0){return 1;}

	var contador = 0;
	for(adaptador of adaptadoresCompatibles(inicial, adaptadoresRestantes)){
		quitarAdaptador = adaptadoresRestantes.filter(x => (x != adaptador));
		contador += calcularNumeroDeCombinaciones(adaptador, quitarAdaptador);
	}
	
	return contador;
}


function calcularNumeroDeCombinacionesMemo(inicial, adaptadoresRestantes){
	if(adaptadoresCompatibles(inicial, adaptadoresRestantes).length==0){return 1;}
	if(memo[inicial] != -1){return memo[inicial];}

	var contador = 0;
	for(adaptador of adaptadoresCompatibles(inicial, adaptadoresRestantes)){
		quitarAdaptador = adaptadoresRestantes.filter(x => (x != adaptador));
		contador += calcularNumeroDeCombinacionesMemo(adaptador, quitarAdaptador);
	}

	memo[inicial] = contador;
	return contador;
}
		

//Parte 1
ordenados = [0].concat( adaptadores.sort(function(a, b){return a-b;}) );
//console.log(ordenados);
console.log(diferenciasDeJolts(1, ordenados) * (diferenciasDeJolts(3, ordenados)+1) );
//ordenDeEnchufado = calcularCadenaMasLarga(0, adaptadores); //chequear que da igual al sort
//console.log(ordenDeEnchufado);


//Parte 2
maximo = Math.max(...ordenados);
memo=[];
for(i=1; i<maximo+1; i++){
	memo.push(-1);
}

console.log(  calcularNumeroDeCombinacionesMemo(0, adaptadores) );

