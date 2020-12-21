def readToList(file):
	with open(file, 'r') as f:
		out = f.readlines()
	
	return [x.strip('\n') for x in out ]
	

def day01():
	lista = readToList('input_1')
	numbers = [int(x) for x in lista]
	for a in numbers:
		for b in numbers:
			if a+b == 2020:
				print("Parte 1: %i"%(a*b))
			for c in numbers:
				if a+b+c == 2020:
					print("Parte 2: %i"%(a*b*c))
			

def day02():
	inData = readToList('input_2')
	valids_1 = 0
	valids_2 = 0
	for line in inData:
		minimo = int(line[:line.find("-")])
		maximo = int(line[line.find("-")+1:line.find(" ")])
		letter = line[line.find(" ")+1:line.find(":")]
		password = line[line.find(":")+2:]
		
		test = password.count(letter)
		if test>=minimo and test<=maximo:
			valids_1+=1
			
		if password[minimo-1]==letter and password[maximo-1]!=letter:
			valids_2+=1
		if password[minimo-1]!=letter and password[maximo-1]==letter:
			valids_2+=1
			
	print("Parte 1: %i"%(valids_1))
	print("Parte 2: %i"%(valids_2))
	
def day03():
	inMap = readToList('input_3')
	def countTrees(right, down):
		trees = 0
		cursor = 0
		for row in inMap[down::down]:
			cursor += right
			if row[cursor%len(row)] == '#':
				trees += 1
		
		return(trees)
		
	print("Parte 1: %i"%countTrees(3, 1))
	
	res = 1
	for slope in [(1,1), (3,1), (5,1), (7,1), (1,2)]:
		res *= countTrees(*slope)
		print(countTrees(*slope))
	
	print("Parte 2: %i"%res)
		

def day04():
	batchFile = readToList('input_4')
	passports = [dict()]
	for entry in batchFile:
		if entry == '':
			passports.append(dict())
			continue
		fields = entry.split(' ')
		for field in fields:
			key = field.split(':')[0]
			data = field.split(':')[1]
			passports[-1][key] = data
	
	#['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt', 'cid']
	validIfContains = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']
	
	validPassports = []
	for passp in passports:
		if all([x in passp.keys() for x in validIfContains]):
			validPassports.append(passp)
	
	print("Parte 1: %i"%len(validPassports))
	
	criterios = dict()
	criterios['byr'] = lambda x: len(x)==4 and int(x)>=1920 and int(x)<=2002 #hará falta hacer .strip()???
	criterios['iyr'] = lambda x: len(x)==4 and int(x)>=2010 and int(x)<=2020
	criterios['eyr'] = lambda x: len(x)==4 and int(x)>=2020 and int(x)<=2030
	criterios['hgt'] = lambda x: ('cm' in x and int(x[:-2])>=150 and int(x[:-2])<=193) or ('in' in x and int(x[:-2])>=59 and int(x[:-2])<=76)
	criterios['hcl'] = lambda x: x[0]=='#' and len(x)==7 and all([c in '0123456789abcdef' for c in x[1:]])
	criterios['ecl'] = lambda x: x in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
	criterios['pid'] = lambda x: len(x)==9 and int(x)>0
	
	valids = 0
	for passp in validPassports:
		if all([criterios[k](passp[k]) for k in validIfContains]):
			valids+=1
	
	print("Parte 2: %i"%valids)
	
def day06():
	batchFile = readToList('input_6')
	batchFile.append('')
	suma = 0;
	todas = ''
	for l in batchFile:
		if l=='':
			suma += len(set(todas))
			todas = ''
			continue
		else:
			todas += l
	print(suma)

def day062():
	batchFile = readToList('input_6')
	batchFile.append('')
	suma = 0
	todas = []
	for l in batchFile:
		if l=='':
			interseccion = todas[0]
			for x in todas:
				interseccion = interseccion.intersection(x)
			suma+=len(interseccion)
			
			todas = []
			continue
		else:
			todas.append(set(l))
		

			
	print(suma)

day062()