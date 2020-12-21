const fs = require("fs");

const input = fs.readFileSync('input_19', {encoding: 'utf-8'}).trim().split(/\n/);

rules = new Object();
i = 0;
while(input[i]!=''){
	key = input[i].split(": ")[0];
	rules[key] = input[i].split(": ")[1].split('|');
	for(j=0; j<rules[key].length; j++){
			if(input[i].match(/"/)){
				rules[key] = rules[key][j].toString().match(/[a-z]/)[0];
			}else{
				rules[key][j] = rules[key][j].trim().split(" ");
			}
	}
	i++;
}

i++;
data = [];
for(i; i<input.length; i++){
	data.push(input[i])
}

//console.log(rules)
//console.log(data)
//console.log('---------------------------')

function allPossibleSums(s1, s2){
	sums = new Set();
	for(n of s1){
		for(m of s2){
			sums.add(n+m)
		}
	}
	return sums;
}


ruleLengths = new Object();
function possibleLengths(ruleId){
	if(ruleLengths[ruleId]){
		return ruleLengths[ruleId];
	}
	
	if(rules[ruleId]=='a' || rules[ruleId]=='b'){
		ruleLengths[ruleId] = new Set([1]);
		return ruleLengths[ruleId];
	}

	ruleLengths[ruleId] = new Set();
	for(rule of rules[ruleId]){
		let lengths = new Set([0]);
		for(id of rule){
			lengths = allPossibleSums(lengths, possibleLengths(id));
		}
		for(l of lengths){ ruleLengths[ruleId].add(l); }
	}

	return ruleLengths[ruleId];
}


function canStringBe(string, ruleNumbers){
	if(ruleNumbers.length == 1){ return stringFollowsRule(string, ruleNumbers[0]); }
	if(string.length == 1){return false;}

	let test = false;
	let separation = 1;
	while(separation<string.length){
		let substring1 = string.slice(0, separation);
		let substring2 = string.slice(separation,);
		if( stringFollowsRule(substring1, ruleNumbers[0]) ){
			if(ruleNumbers.length == 2){
				test = stringFollowsRule(substring2, ruleNumbers[1]);
			}else{
				test = canStringBe(substring2, ruleNumbers.slice(1,));
			}

		}
		if(test){ return true; }
		separation++;
	}
	return false;

}

function stringFollowsRule(string, ruleId){
	if( !possibleLengths(ruleId).has(string.length) ){return false;}

	if(rules[ruleId]=='a' || rules[ruleId] == 'b'){
		return (string==rules[ruleId]);
	}else{
		let test = false;
		for(r of rules[ruleId]){
			test = test || canStringBe(string, r);
			if(test){break;}
		}
	return test;
	}
}


//Part 1
count = 0;
for(x of data){
	if( stringFollowsRule(x, '0') ){
		count++;
	}
}
console.log( count )

//Part 2
rules['8'] = [['42'], ['42', '8']];
rules['11'] = [['42', '31'], ['42', '11', '31']];

ruleLengths = new Object(); //clear memory
possibleLengths('8');
possibleLengths('11');

function setMax(set){
	let M = 0;
	for(s of set){
		if(s>M){M=s;}
	}
	return M;
}

function setMin(set){
	let m = Infinity;
	for(s of set){
		if(s<m){m=s;}
	}
	return m;
}

maxStringLength = 0;
for(x of data){
	if(x.length > maxStringLength){maxStringLength = x.length;}
}

for(r of ['8', '11']){
	k = 2;
	while( setMax(ruleLengths[r]) < maxStringLength ){
		ruleLengths[r].add(k* setMin(ruleLengths[r]) );
		k++;
	}
}

count = 0;
for(x of data){
	if( stringFollowsRule(x, '0') ){
		count++;
	}
}

console.log( count )

