'use strict'

//? Unit 6.3. Замыкание

//let name = "John";
//function sayHi() {
//	alert("Hi, " + name);
//}
//name = "Pete";
////console.log(sayHi());



//function makeWorker() {
//	let name = "Pete";
//	return function () {
//		alert(name);
//	};
//}
//name = "John";
//let work = makeWorker();
//console.log(work());

//?Порядок выполнения кода, приведённого выше:
//В глобальном лексическом окружении есть name: "John".
//На строке (*) глобальная переменная изменяется, теперь name: "Pete".
//Момент, когда выполняется функция sayHi() и берёт переменную name извне. Теперь из глобального лексического окружения, где переменная уже равна "Pete".


//function User(name) {
//	// методом объекта становится вложенная функция
//	this.sayHi = function () {
//		alert(name);
//	};
//}
//let user = new User('John');
//console.log(user.sayHi());



//function makeCounter() {
//	let count = 0;

//	return function () {
//		return count++; // есть доступ к внешней переменной "count"
//	};
//}
//let counter = makeCounter();
//console.log(counter());	// 0
//console.log(counter());	// 1
//console.log(counter());	// 2



//let a = 0;
//{
//	let b = a + 100/5*2;
//	a = b;
//}
//console.log(a);



//function f() {
//	let value = Math.random();						// три функции в массиве, каждая из них ссылается на лексическое окружение
//	return function () { alert(value); };		// из соответствующего вызова f()
//}
//let arr = [f(), f(), f()];



//function sum(a) {
//	return function(b) {
//		return a + b;
//	}
//}
//console.log(sum(1)(2));
//sum(5)(-1) = 4



//let arr = [1, 2, 3, 4, 5, 6, 7];
//function inBetween(a, b) {
//	return function (x) {
//		if (x >= a && x <= b) return true;
//	}
//}
//function inArray(a) {
//		return function (item) {
//			if (a.includes(item)) return true;
//		}
//}
//alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
//alert( arr.filter(inArray([1, 2, 10])) ); // 1,2




//let users = [
//	{ name: "John", age: 20, surname: "Johnson" },
//	{ name: "Pete", age: 18, surname: "Peterson" },
//	{ name: "Ann", age: 19, surname: "Hathaway" }
//];
//function byField(us) {
//	return (a, b) => a[us] > b[us] ? 1 : -1;
//}
//users.sort(byField('name'));
//users.sort(byField('age'));
//console.log(users);



//function makeArmy() {
//	let shooters = [];
//	let i = 0;
//	while (i < 10) {
//		let j = i;
//		let shooter = function () { // функция shooter
//			alert(j); // должна выводить порядковый номер
//		};
//		shooters.push(shooter);
//		i++;
//	}
//	return shooters;
//}
//let army = makeArmy();
//army[0]();
//army[5]();



//? Unit 6.4. Устаревшее ключевое слово "var"
//var user = 5;
//var user = 10;
//console.log(userss);


//? Unit 6.5. Глобальный объект
//console.log(this);
//window.alert('HII')

//? Unit 6.6. Объект функции, NFE
//function makeCounter(a) {
//	let count = 0;
//	function counter() {
//		return count++;
//	}
//	counter.set = value => count = value;
//	counter.decrease = () => count--;
//	return counter;
//}
//let counter = makeCounter();
//console.log(counter.set('aaaa'));
//console.log(counter());
//console.log(counter());


//? Unit 6.7. Синтаксис "new Function"
//let sum = new Function('a', 'b', 'return a + b');
//console.log(sum(1,2));

//? Unit 6.8. Планирование: setTimeout и setInterval
//function sto() {
//	console.log('STO');
//}
//let timeId = setTimeout(sto, 3000);
//console.log(timeId);
//clearTimeout(timeId);



//let tId = setInterval(() => {console.log('interval')}, 1000);
//setTimeout(() => {clearInterval(tId)}, 5000);



//let timerId = setTimeout(tick, 1000);
//function tick() {
//	alert('tick');
//	timerId = setTimeout(tick, 1000); // (*)
//}


//function printNumbers(from, to) {
//	if (from <= to) {
//		console.log(from);
//		from++;
//		setTimeout(printNumbers, 1000, from, to)
//	}
//}
//setTimeout(printNumbers, 1000, 10, 15)


//let tId = setInterval(() => {
//	console.log(from);
//	from++;
//}, 1000, 5, 10)
//setTimeout(() => {clearInterval(tId)}, ((to - from + 1)*1000))



//? Unit 6.9. Декораторы и переадресация вызова, call/apply

//function slow(x) {
//	alert(`Vot ${x}`);					//  Функция для кеширования
//	return x * 2;							//  Результат вызова cachingDecorator(func) является «обёрткой»,
//}												//т.е. function(x) «оборачивает» вызов func(x) в кеширующую логику
//function cachingDecorator(func) {
//	let cashe = new Map();
//	console.log(cashe);
//	return function (x) {
//		if (cashe.has(x)) return cashe.get(x);
//		let res = func(x);
//		cashe.set(x, res);
//		return res;
//	}
//}
//let casheDec = cachingDecorator(slow);
//console.log(casheDec(1));
//console.log(casheDec(1));
//console.log(casheDec(2));




//let worker = {
//	someMethod() {
//		return 1;
//	},

//	slow(x) {
//		// здесь может быть страшно тяжёлая задача для процессора
//		alert("Called with " + x);
//		return x * this.someMethod(); // (*)
//	}
//};
//// тот же код, что и выше
//function cachingDecorator(func) {
//	let cache = new Map();
//	return function (x) {
//		if (cache.has(x)) {
//			return cache.get(x);
//		}
//		let result = func.call(worker, x); // (**)
//		cache.set(x, result);						// Используем call в обёртке для передачи контекста в исходную функцию
//		return result;
//	};
//}
//alert(worker.slow(1)); // оригинальный метод работает
//worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим
//alert(worker.slow(2));



//function sayHi(p) {
//	console.log(`${p}, ${this.name}`);
//}
//let user = { 'name': 'Maxim' };
//sayHi.call(user, 'Bonjorno')




//let worker = {
//	slow(min, max) {
//		alert(`Call ${min}, ${max}`);
//		return min + max; // здесь может быть тяжёлая задача
//	}
//};
//function cachingDecorator(func, hash) {
//	let cache = new Map();
//	return function (...args) {
//		let key = hash(args);
//		if (cache.has(key)) {
//			return cache.get(key);
//		}
//		let result = func.apply(worker, args); // (**)
//		cache.set(key, result);						// Используем call в обёртке для передачи контекста в исходную функцию
//		return result;
//	};
//}
//function hash(args) {
//	return `${args[0]},${args[1]}`;
//}

//worker.slow = cachingDecorator(worker.slow, hash);
//alert( worker.slow(3, 5) ); // работает
//alert( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)



//! task 1
//function work(a, b) {
//	alert(a + b); // произвольная функция или метод
//}
//function hash(args) {
//	return `${args[0]},${args[1]}`
//}
//function spy(func) {
//	let cache = new Map();
//	return function (...args) {
//		let key = hash(args);
//		if (cache.has(key)) return cache.get(key);
//		let res = func(args[0], args[1]);
//		return res;
//	}
//}
//work = spy(work);
//work(1, 2); // 3
//work(4, 5); // 9


//! task 2
//function f(x) {
//	alert(x);
//}
//function delay(func, ms) {
//	return function (...args) {
//		setTimeout(() => func(args), ms);
//	}
//}
//let f1000 = delay(f, 1000);
//f1000("test");



//! task 3
//function debounce(func, ms) {
//	let is = false;
//	return function() {
//		if (is) return;
//		func.apply(this, arguments);
//		is = true;
//		setTimeout(() => is = false, ms);
//	}
//}
//let f = debounce(alert, 1000);
//f(1);
//f(2);
//setTimeout( () => f(3), 100);
//setTimeout( () => f(4), 1100);
//setTimeout( () => f(5), 1500);


//! task 4
//function f(a) {
//	console.log(a)
//}

//function throttle(func, ms) {
//	let isCoolDown = false
//	return function() {
//		if (isCoolDown) return;
//		func.apply(this, arguments);
//		isCoolDown = true;
//		setTimeout(() => isCoolDown = false, ms);
//	}
//}

//// f1000 передаёт вызовы f максимум раз в 1000 мс
//let f1000 = throttle(f, 1000);

//f1000(1); // показывает 1
//f1000(2); // (ограничение, 1000 мс ещё нет)
//f1000(3); // (ограничение, 1000 мс ещё нет)





//? Unit 6.10. Привязка контекста к функции
