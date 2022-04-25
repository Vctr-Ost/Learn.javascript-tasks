'use strict'

//? Unit 5.10. Деструктурирующее присваивание

////! task #1
//let user = {
//	name: "John",
//	years: 30
//};

//let { name, years, isAdmin = false } = user;

//console.log(name);
//console.log(years);
//console.log(isAdmin);

////! task #2
//let salaries = {
//	"John": 100,
//	"Pete": 300,
//	"Mary": 250
//};

//let res = Object.values(salaries).reduce((acc, item) => {
//	if (item > acc) acc = item;
//	return acc;
//}, null)
//console.log(res);


//? Unit 5.11. Дата и время

//! task #1
//let d = new Date(2012, 1, 20, 3, 12);
//console.log(d);

//! task #2
//let date = new Date(2012, 0, 3);  // 3 января 2012 года
//let days = {
//	0: 'НД',
//	1: 'ПН',
//	2: 'ВТ',
//	3: 'СР',
//	4: 'ЧТ',
//	5: 'ПТ',
//	6: 'СБ',
//}
//console.log(days[date.getDay()]);

//! task #3
//let date = new Date(2012, 0, 3);  // 3 января 2012 года
//console.log(date.getDay());


//! task #4
//let date = new Date(2015, 0, 2);

//function getDateAgo(date, days) {
//	date.setDate(date.getDate() - days);
//	return date.getDate();
//}

//alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
//alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
//alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)


//? Unit 5.12. Формат JSON, метод toJSON

//! task #1
//let user = {
//	name: "Василий Иванович",
//	age: 35
//};
//let json = JSON.stringify(user, null, 2);
//let parse = JSON.parse(json);

//! task #2
//let room = {
//	number: 23
//};

//let meetup = {
//	title: "Совещание",
//	occupiedBy: [{ name: "Иванов" }, { name: "Петров" }],
//	place: room
//};

//room.occupiedBy = meetup;
//meetup.self = meetup;

//alert(JSON.stringify(meetup, function replacer(key, value) {
//	return (key != '' && value == meetup) ? undefined : value;
//}));


//? Unit 6.1. Рекурсия и стек

function pow(x, n) {
	if (n === 1) return x;
	else return x * pow(x, n - 1)
}
//console.log( pow(2, 4) );

//========================================

let company = {
	sales: [{
		name: 'John',
		salary: 1000
	}, {
		name: 'Alice',
		salary: 600
	}],

	development: {
		sites: [{
			name: 'Peter',
			salary: 2000
		}, {
			name: 'Alex',
			salary: 1800
		}],

		internals: [{
			name: 'Jack',
			salary: 1300
		}]
	}
};

function salls(dep) {
	if (Array.isArray(dep)) return dep.reduce((a, b) => a + b.salary, 0);
	else {
		let sum = 0;
		for (let item of Object.values(dep)) {
			sum += salls(item);
		}
		return sum;
	}
}

//console.log(salls(company));

//========================================

//! task #1
function sumTo(n) {
	if (n === 1) return n;
	else return n + sumTo(n - 1);
}
//console.log(sumTo(3));

//! task #2
function factorial(n) {
	if (n === 1) return n;
	else return n * factorial(n - 1);
}
//console.log( factorial(4) );

//! task #3
function fib(n) {
	if (n <= 1) return n;
	else return (fib(n - 1) + fib(n - 2))
}
//console.log(fib(10));

//! task #4
let list = {
	value: 1,
	next: {
		value: 2,
		next: {
			value: 3,
			next: {
				value: 4,
				next: null
			}
		}
	}
};

function printList(list) {
	alert(list.value);
	if (list.next) {
		printList(list.next);
	}
}
//printList(list);

//! task #5
function reverse(list) {
	if (list.next) {
		printList(list.next);
	}
	alert(list.value);
}
//reverse(list);




//? Unit 6.2. Остаточные параметры и оператор расширения

let arr6 = [1, 2, 4, 8, 5, 11, 24, 1, 2];

console.log(Math.max(...arr6));