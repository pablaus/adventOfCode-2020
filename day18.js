const fs = require("fs");

const input = fs.readFileSync('input_18', {encoding: 'utf-8'}).trim().split(/\n/);

function elementaryOperation(string){
	operation = string.split(' ');
	if(operation[1]=='+'){
		result = parseInt(operation[0])+parseInt(operation[2]);
	}
	if(operation[1]=='*'){
		result = parseInt(operation[0])*parseInt(operation[2]);
	}
	return result.toString()
}

function evaluateWithNoParentheses(string){
	let re = /^\d* [\+\*] \d*/;
	while(string.match(re)){
		singleOp = string.match(re)[0];
		result = elementaryOperation(singleOp);
		string = string.replace(singleOp, result);
	}
	return string;
}

function evaluateExpression(string){
	let re = /\(([^\(\)]*)\)/;
	while(string.match(re)){
		insideExpression = string.match(re)[0];
		result = evaluateWithNoParentheses(insideExpression.slice(1,-1));
		string = string.replace(insideExpression, result);
	}
	return parseInt( evaluateWithNoParentheses(string) );
}

//Part 1
out = 0;
for(expression of input){
	out += evaluateExpression(expression);
}
console.log( out );


//Part 2
function replaceSums(string){
	let simpleSum = /\d+ \+ \d+/;
	while(string.match(simpleSum)){
		toReplace = string.match(simpleSum)[0];
		string = string.replace(toReplace, evaluateWithNoParentheses(toReplace))
	}
	return string;
}

function evaluateExpressionWithSumPriority(string){
	let re = /\(([^\(\)]*)\)/;
	while(string.match(re)){
		insideExpression = string.match(re)[0];
		result = replaceSums( insideExpression.slice(1,-1) )
		result = evaluateWithNoParentheses(result);
		string = string.replace(insideExpression, result);
	}
	string = replaceSums( string )
	return parseInt( evaluateWithNoParentheses(string) );
}

out = 0;
for(expression of input){
	out += evaluateExpressionWithSumPriority(expression);
}

console.log( out );


