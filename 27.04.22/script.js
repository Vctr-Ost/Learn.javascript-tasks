'use strict'

//? Unit 9.1. Класс: базовый синтаксис
//class User {
//	constructor(name) {
//		this.name = name;
//	}
//	sayHi() {
//		alert(`Hello, ${this.name}`);
//	}
//}

//let u1 = new User('Ivan');
//let u2 = new User('Kymis');
//console.log(u1);
//u2.sayHi();
//console.log(typeof User);
//console.log(User.prototype.constructor);





//class User {
//	constructor(name) {
//		this.name = name;
//		this.job = "Geodez";
//	}
//	get showName() {
//		return this.name;
//	}
//	set showName(val) {
//		if (val.length < 4) alert('Very short name !');
//		else this.name = val;
//	}
//}

//let u1 = new User('Maxim');
//u1.showName = 'inaa';
//console.log(u1);



//class Clock {
//	constructor({ template }) {
//		this.template = template;
//		let timer;
//	}

//	render() {
//		let date = new Date();
//		let hours = date.getHours();
//		if (hours < 10) hours = '0' + hours;
//		let mins = date.getMinutes();
//		if (mins < 10) mins = '0' + mins;
//		let secs = date.getSeconds();
//		if (secs < 10) secs = '0' + secs;
//		let output = this.template
//			.replace('h', hours)
//			.replace('m', mins)
//			.replace('s', secs);
//		console.log(output);
//	}

//	stop() {
//		clearInterval(this.timer);
//	};
//	start() {
//		this.render();
//		this.timer = setInterval(() => this.render, 1000);
//	};
//}

//let clock = new Clock({ template: 'h:m:s' });
//clock.start();





//? Unit 9.2. Наследование классов
//class Animal {
//	constructor(name) {
//		this.name = name;
//		this.speed = 0;
//	}
//	run(speed) {
//		this.speed = speed;
//		alert(`${this.name} run ${this.speed} km/h`)
//	}
//	stop() {
//		alert(`${this.name} STOP!`);
//		this.speed = 0;
//	}
//}

//class Rabbit extends Animal {
//	constructor(name, age) {				// Конструктор в прототипо-наследуемом классе
//		super(name);
//		this.age = age;
//	}

//	hide() {
//		alert(`${this.name} is hidden!`);
//	}

//	stop() {
//		super.stop();
//		this.hide();
//	}
//}

////let an = new Animal('My animal');
//let rab = new Rabbit(`My rabbit`, 18);
//rab.run(55);
//rab.stop();
//console.log(rab);





//function func() {
//	return class {
//		sayHi() {
//			alert('Hello!')
//		}
//	}
//}
//class Hello extends func() { };
//new Hello().sayHi();




//* У стрелочных функций нет своего super
//class Rabbit extends Animal {
//	stop() {
//		setTimeout(() => super.stop(), 1000);		// вызывает родительский stop после 1 секунды
//	}															// super в стрелочной функции тот же самый, что и в stop()
//}



//! task 1
//class Animal {
//	constructor(name) {
//		this.name = name;
//	}
//}
//class Rabbit extends Animal {
//	constructor(name) {
//		super(name);
//		this.created = Date.now();
//	}
//}
//let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
//alert(rabbit.name);


//! task 2
//class Clock {
//	constructor({ template }) {
//		this.template = template;
//	}

//	render() {
//		let date = new Date();

//		let hours = date.getHours();
//		if (hours < 10) hours = '0' + hours;

//		let mins = date.getMinutes();
//		if (mins < 10) mins = '0' + mins;

//		let secs = date.getSeconds();
//		if (secs < 10) secs = '0' + secs;

//		let output = this.template
//			.replace('h', hours)
//			.replace('m', mins)
//			.replace('s', secs);

//		console.log(output);
//	}

//	stop() {
//		clearInterval(this.timer);
//	}

//	start() {
//		this.render();
//		this.timer = setInterval(() => this.render(), 1000);
//	}
//}

//class ExtendedClock extends Clock {
//	constructor({ template }, precision = 1000) {
//		super(template);
//		this.precision = precision;
//	}
//}




//? Unit 9.3. Статические свойства и методы
//class User {
//	static meth() {
//		alert(this === user);
//	}
//}




//class Article {
//	constructor(title, date) {
//		this.title = title;
//		this.date = date;
//	}
//	static compare(articleA, articleB) {				// Article.compare стоит «над» статьями, как средство для их сравнения.
//		return articleA.date - articleB.date;			// Это метод не отдельной статьи, а всего класса.
//	}
//	static createTodays() {
//		return new this('Todays digest', new Date());
//	}
//}

//let articles = [
//	new Article('HTML', new Date(2020, 1, 1)),		
//	new Article('CSS', new Date(2018, 0, 12)),
//	new Article('JavaScript', new Date(2014, 8, 4)),
//];
//articles.sort(Article.compare);

//let art = Article.createTodays();		// Теперь каждый раз, когда нам нужно создать сегодняшний дайджест, нужно вызывать Article.createTodays().
////console.log(art);								// Ещё раз, это не метод одной статьи, а метод всего класса.

//class Rabbit extends Article { }
//let rabs = [
//	new Rabbit('rab1', 10),
//	new Rabbit('rab2', 5),
//];
//rabs.sort(Rabbit.compare);
//console.log(rabs);





//? Unit 9.4. Приватные и защищённые методы и свойства
//class CoffeMachine {
//	waterAmount = 0;

//	constructor(power) {
//		this.power = power;
//		alert(`CoffeMachine is created. Power: ${power}V`);
//	}
//}
//let machine = new CoffeMachine(220);		// waterAmount и power публичные. Мы можем легко получать и устанавливать им любое значение извне.
//machine.waterAmount = 20;
//console.log(machine);




//class CoffeMachine {
//	_waterAmount = 0;					// Защищённое свойство

//	set waterAmount(val) {
//		if (val < 0) {
//			alert(`Error: val < 0 !!!`);
//			return;
//		}
//		this._waterAmount = val;
//	}

//	get waterAmount() {
//		return this._waterAmount;
//	}

//	getpower() {						// В большинстве случаев использование функций get.../set... предпочтительнее
//		return this._power;
//	}

//	constructor(power) {
//		this._power = power;
//		alert(`CoffeMachine is created. Power: ${power}V`);
//	}
//}
//let machine = new CoffeMachine(220);
//machine.waterAmount = 50;
//console.log(machine.getpower());





//class CoffeMachine {
//#waterLimit = 50;
//
//#chechWater(val) {
//if (val < 0) throw new Error("Отрицательный уровень воды");
//if (val > this.#waterLimit) throw new Error("Слишком много воды");
//}
//}
//let machine = new CoffeMachine();
//machine.#checkWater(80);					//Снаружи нет доступа к приватнім свойствам
//* На уровне языка # является специальным символом, который означает, что поле приватное. Мы не можем получить к нему доступ извне или из наследуемых классов.






//* сделаем аксессор waterAmount для #waterAmount:
//class CoffeMachine {
//	#waterAmount = 50;

//	setWaterAmount(val) {
//		if (val >= 0) this.#waterAmount = val;
//	}
//}
//let machine = new CoffeMachine();
//machine.setWaterAmount(20);

//class MegaMachine extends CoffeMachine {
//method() {
//console.log(this.#waterAmount);				//Невозможно достать из другого класса
//}
//}




//? Unit 9.5. Расширение встроенных классов
//class PowerArray extends Array {
//isEmpty() {
//return this.length === 0;
//}
//}

//let arr = new PowerArray(1, 5, 4, 8, 6);
//console.log(arr.isEmpty());

//let newArr = arr.filter(i => i >= 5);
//console.log(newArr.isEmpty());




//? Unit 9.6. Проверка класса: "instanceof"
//class Rabbit {}
//let rab = new Rabbit();
//console.log(rab instanceof Rabbit);		// true


//function Rabbit() {}
//console.log( new Rabbit instanceof Rabbit );		// true


//let arr = [1, 2, 3, 4, 5];
//console.log( arr instanceof Array );
//console.log( arr instanceof Object );


//let obj = {};
//alert(obj);
//alert(obj.toString());




//? Unit 9.7. Примеси
//let primesi = {
//	sayHi() {
//		console.log(`HELLO, ${this.name} !!!`);
//	},															// Ставить запятые
//	sayBye() {
//		console.log(`BYE, ${this.name} !!!`);
//	}
//}

//class User {
//	constructor(name) {
//		this.name = name;
//	}
//}

//Object.assign(User.prototype, primesi);		// копируем методы
//let u1 = new User('Ivan');
//u1.sayBye();




//let sayMixin = {
//	say(phrase) {
//		alert(phrase);
//	}
//};
//let sayHiMixin = {
//	__proto__: sayMixin,

//	sayHi() {
//		super.say(`Hello, ${this.name}`);
//	},
//	sayBye() {
//		super.say(`Bood-Bye, ${this.name}`);
//	}
//}

//class User {
//	constructor(name) {
//		this.name = name;
//	}
//}

//Object.assign(User.prototype, sayHiMixin);

//let u1 = new User('Ivan');
//u1.sayBye();






//let eventMixin = {
//	on(eventName, handler) {
//		if (!this._eventHandlers) this._eventHandlers = {};
//		if (!this._eventHandlers[eventName]) {
//			this._eventHandlers[eventName] = [];
//		}
//		this._eventHandlers[eventName].push(handler);
//	},

//	OfflineAudioCompletionEvent(eventName, handler) {
//		let handlers = this._eventHandlers && this._eventHandlers[eventName];
//		if (!handlers) return;
//		for (let i = 0; i < handlers.length; i++) {
//			if (handlers[i] === handler) {
//				handlers.splice(i--, 1);
//			}
//		}
//	},

//	trigger(eventName, ...args) {
//		if (!this._eventHandlers || !this._eventHandlers[eventName]) {
//			return;
//		}
//		this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
//	}
//}

//class Menu {
//	choose(value) {
//		this.trigger("select", value);
//	}
//}

//Object.assign(Menu.prototype, eventMixin);
//let menu = new Menu();
//menu.on("select", value => alert(`Выбранное значение: ${value}`));
//menu.choose("123");






//? Unit 10.1. Обработка ошибок, "try..catch"
//try {
//	console.log(11111);
//	lalala;
//	console.log(222);
//}
//catch(err) {
//	console.log('NOOOO');
//	console.log(err);
//}


