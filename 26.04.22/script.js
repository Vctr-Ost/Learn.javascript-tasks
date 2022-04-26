'use strict'

//? Unit 6.10. Привязка контекста к функции
//let user = {
//	firstName: "Вася",
//	sayHi() {
//		alert(`Привет, ${this.firstName}!`);		// undefined
//	}
//};
//setTimeout(user.sayHi, 1000); // Привет, undefined!

//* Решение 1: сделать функцию-обёртку (обернуть вызов в анонимную функцию, создав замыкание)
//setTimeout(function () {
//	user.sayHi();					// Привет, Вася!
//}, 1000);

//setTimeout( () => user.sayHi.call(user), 1000 );

//Теперь код работает корректно, так как объект user достаётся из замыкания, а затем вызывается его метод sayHi.
// То же но короче		setTimeout(() => user.sayHi(), 1000); // Привет, Вася!

//* Решение 2: привязать контекст с помощью bind
// В современном JavaScript у функций есть встроенный метод bind, который позволяет зафиксировать this.

//let sayHi = user.sayHi.bind(user);		// Теперь sayHi – это «связанная» функция, которая может быть вызвана отдельно или передана в setTimeout (контекст всегда будет правильным).
//setTimeout(sayHi, 1000);

//let sH = user.sayHi.bind(user);
//sH('Privet')							// Все аргументы передаются исходному методу func как есть


// Когда мы привязываем аргументы, такая функция называется «частично применённой» или «частичной».
//function mul(a, b) {
//return a * b;
//}
//let double = mul.bind(null, 2);
//alert(double(3)); // = mul(2, 3) = 6
//alert(double(4)); // = mul(2, 4) = 8


//! task 4
//function askPassword(ok, fail) {
//	let password = prompt("Password?", '');
//	if (password == "rockstar") ok;
//	else fail;
//}
//let user = {
//	name: 'Вася',
//	loginOk() {
//		alert(`${this.name} logged in`);
//	},
//	loginFail() {
//		alert(`${this.name} failed to log in`);
//	},
//};
//askPassword(user.loginOk.bind(user), user.loginFail.bind(user));



//! task 5
//function askPassword(ok, fail) {
//	let password = prompt("Password?", '');
//	if (password == "rockstar") ok();
//	else fail();
//}
//let user = {
//	name: 'John',
//	login(result) {
//		alert(this.name + (result ? ' logged in' : ' failed to log in'));
//	}
//};
//askPassword(user.login.bind(user, true), user.login.bind(user, false));



//? Unit 6.11. Повторяем стрелочные функции

//let group = {
//	title: "Our Group",
//	students: ["John", "Pete", "Alice"],
//	showList() {
//		this.students.forEach(										// У стрелочных функций нет «this»
//			student => alert(this.title + ': ' + student)	// Если происходит обращение к this, его значение берётся снаружи.
//		);
//	}
//};
//group.showList();



//function defer(f, ms) {
//	return function () {
//		setTimeout(() => f.call(this, arguments), ms)
//	};
//}
//function sayHi(who) {
//	alert('Hello, ' + who);
//}
//let sayHiDeferred = defer(sayHi, 2000);
//sayHiDeferred("John"); // выводит "Hello, John" через 2 секунды




//? Unit 7.1. Флаги и дескрипторы свойств
//let a = {
//	name: 'Andre',
//	age: 28,
//	city: 'Kyiv',
//};

//Object.defineProperty(a, 'country', {value: 'Ukraine'});
//Object.defineProperties(a, {alp: {value: 'alphabet', writable: true, enumerable: true, configurable: true}, alp2: {value: 'asdasdasd'}});

//let b = Object.getOwnPropertyDescriptor(a, 'country');

//console.log(a);
//console.log(Object.getOwnPropertyDescriptors(a));



//? Unit 7.2. Свойства - геттеры и сеттеры
//let user = {
//	name: "John",
//	surname: "Smith",
//	get fullName() {
//		return `${this.name} ${this.surname}`;		// Снаружи свойство-аксессор выглядит как обычное свойство.
//	},
//	set fullName(value) {
//		[this.name, this.surname] = value.split(' ');
//	}
//};
//user.fullName = 'Adam Ondra';	// К сеттеру
//console.log(user.name);		// Мы не вызываем user.fullName как функцию, а читаем как обычное свойство.




//let company = {
//	name: 'Anna',
//	surname: 'Potemkina',
//	age: 28,

//	set newPerson(val) {
//		this.age = val;
//	}
//}
//company.newPerson = 112;
//console.log(company);




//let user = {
//	name: "John",
//	surname: "Smith"
//};
//Object.defineProperty(user, 'fullName', {get () {
//	return `${this.name} ${this.surname}`;
//}})
//console.log(user.fullName);





//let user = {				// Умные геттеры/сеттеры
//	get uName() {
//		return this.name;
//	},

//	set uName(val) {
//		if (val.length < 4) {
//			alert ('Short name');
//			return;
//		}
//		this.name = val;
//	}
//}

//user.uName = 'Moydodyr';
//console.log(user.uName);

//user.uName = 'asd';



//? Unit 8.1. Прототипное наследование

//let animal = {
//	eats: true,
//}
//let rabit = {
//	jumps: true,
//}
//rabit.__proto__ = animal;
//console.log(rabit.eats);



//let animal = {
//	func() {
//		console.log('Hello world');
//	},
//}
//let rab = {
//	eats: true,
//}
//rab.__proto__ = animal;
//rab.func();



//let animal = {
//	name: 'Alice',
//	surname: 'Smith',
//	get func() {
//		return `${this.name} ${this.surname}`;
//	},
//	set func(val) {
//		[this.name, this.surname] = val.split(' ');
//	}
//}

//let rab = {
//	eats: true,
//	__proto__: animal,
//}

//rab.func = 'Adam Ondra';
//console.log(animal.name);
//console.log(animal.surname);
//console.log(animal.func);
//console.log(rab.name);
//console.log(rab.surname);
//console.log(rab.func);

//for (let key in rab) {
//	console.log(key);
//	console.log(rab.hasOwnProperty(key));
//}


//! task 2
//let head = {
//	glasses: 1,
//};
//let table = {
//	pen: 3,
//	__proto__ = head,
//};
//let bed = {
//	sheet: 1,
//	pillow: 2,
//	__proto__ = table,
//};
//let pockets = {
//	money: 2000,
//	__proto__ = bed,
//};



//! task 4
//let hamster = {
//	stomach: [],
//	eat(food) {
//		this.stomach.push(food);
//	}
//};
//let speedy = {
//	stomach: [],
//	__proto__: hamster
//};
//let lazy = {
//	stomach: [],
//	__proto__: hamster
//};
//speedy.eat("apple");
//alert(`speedy: ${speedy.stomach}`);
//alert(`lazy: ${lazy.stomach}`);




//? Unit 8.2. F.prototype
//let animal = {
//	eats: true,
//}
//function Rabit(name) {
//	this.name = name;
//}
//Rabit.prototype = animal;	// Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее: "При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]".
//let rab = new Rabit('rab name');	// rab.__proto__ == animal
//console.log(Rabit);


//! task 1
//function Rabbit() {}
//Rabbit.prototype = {
//	eats: true
//};
//let rabbit = new Rabbit();
//alert(rabbit.eats);

//! task 2
//function User(name) {
//	this.name = name;
//}
//let u1 = new User('Ivan');			// Прототип объекта u1 – это User.prototype, и там тоже нет искомого свойства.
//let u2 = new u1.constructor('Maxim');
//console.log(u1);
//console.log(u2.name);



//? Unit 8.3. Встроенные прототипы
//Function.prototype.defer = function(ms) {
//	setTimeout(this, ms)
//}
//function f() {
//	alert("Hello!")
//}
//f.defer(1000); // выведет "Hello!" через 1 секунду



//Function.prototype.defer = function(ms) {
//	return function(a, b) {
//		setTimeout(() => this(a, b), ms)
//	}
//}
//function f(a, b) {
//	alert(a + b);
//}
//f.defer(1000)(1, 2); // выведет 3 через 1 секунду.




//? Unit 8.4. Методы прототипов, объекты без свойства __proto__
//let animal = {
//	eats: true,
//}
//let rab = Object.create(animal, {
//	jumps: {value: true},
//});

////Object.setPrototypeOf(rab, {})
//console.log(rab);
//console.log( Object.getPrototypeOf(rab) );




let dictionary = Object.create(null, {
	toString: {
		value() {
			return Object.keys(this).join()
		}
	}
});

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

for (let key in dictionary) {
	alert(key);
}

alert(dictionary);