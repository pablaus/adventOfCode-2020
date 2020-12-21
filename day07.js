const fs = require("fs");

const reglas = fs.readFileSync('input_07', {encoding: 'utf-8'}).trim().split(/\n/);

function reglaPara(regla){
	return regla.match(/.+(?= bags contain)/)[0];
}

function puedeContener(regla){
	regla = regla.replace(/.*( bags contain )/, '');
	
	if(regla == 'no other bags.'){
		return [[0, '']];
	}
	
	data = [];
	for(content of regla.split(/,/)){
		number = content.match(/\d+/)[0];
		bag    = content.match(/(?<=\d+ ).*(?= bag)/)[0];
		data.push([parseInt(number), bag]);
	}
	return data;
}

function contenidoDe(bag){
	contenido = [];
	for(regla of reglas){
		if(bag!=reglaPara(regla)){continue;}
		for(insideBag of puedeContener(regla)){
			if(insideBag[0]<1){continue;}
			contenido.push(  insideBag  );
		}
	}
	return contenido;
}

function puedeIncluirShinyGold(bag){
	test = false;
	for(insideBag of contenidoDe(bag)){
		if(insideBag[1] == 'shiny gold'){return true;}
		if(insideBag[1] == ''){return false;}
		test = test || puedeIncluirShinyGold(insideBag[1]);
	}
	return test;
}

function listaDeBags(){
	bags = new Set();
	for(regla of reglas){
		bags.add( reglaPara(regla) );
	}
	return bags;
}


//Parte 1
contador = 0;
for(bag of listaDeBags()){
	if(puedeIncluirShinyGold(bag)){contador += 1;}
}
console.log( contador );

//Parte 2
function contarContenidoDe(bag){
	contador = 0;
	for(insideBag of contenidoDe(bag)){
		contador += insideBag[0];
		contador += insideBag[0] * contarContenidoDe(insideBag[1]);
	}
	return contador;
}

console.log( contarContenidoDe('shiny gold') );
