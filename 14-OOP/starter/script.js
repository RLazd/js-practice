'use strict';
//OOP

//
//  CONSTRUCTORS (constructor function has to be PascalCase)
//Use only func declaration or expression (arrow wont work)
//Call it with new keywor
//Object created from a class = Instance
//Steps when calling constructor:
/*
1. New {} is created
2. function is called, this = {}
3. {} linked to prototype (creates __proto__property)
4. function automatically return {}
*/
const Person = function (firstName, birthYear) {
  //Instance properties:
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Bad practice -> dont make methods inside constructor f:
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2020);
const jack = new Person('Jack', 2010);
console.log(jonas, matilda, jack);

console.log(jonas instanceof Person); //true

//
//  PROTOTYPES
//Every f in JS has properties defined on constructors prototypes property
console.log(Person.prototype); //Prototype property of constructors f
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); //46 jonas does not contain calcAge(), but has access to it

console.log(jonas.__proto__); //prototype of jonas: {calcAge: ƒ, constructor: ƒ} ===Prototype of Jonas object is Prototype property of the (Person) constructor function
console.log(jonas.__proto__ === Person.prototype); //true -> this is how js knows that they are connected

console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
//.prototypeOfLinkedObjects more precise than .property

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda);
console.log(jonas.species, matilda.species);
console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); //false (jonas just has access to it)

//
// PROTOTYPAL INHERITANCE on built-in objects
console.log(jonas.__proto__); //Person
console.log(jonas.__proto__.__proto__); //Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor); //if log -> get function itself; if dir - you get to inspect function

const arr = [3, 3, 5, 6, 7, 8, 8, 9]; // new Array === [];
console.log(arr.__proto__); //shows all array methods
console.log(arr.__proto__ === Array.prototype); //true

console.log(arr.__proto__.__proto__); //Object

//Not a good idea to extend Array.prototype obj
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

const h1 = document.querySelector('h1');
//console.dir(h1); //Prototype = HTMLHeadingElement ... and than huge prototype chain
console.dir(x => x + 1); //Prototype = Objcet. And it has function - bind, call

//Coding challenge

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();
mercedes.brake();

//
//ES6 CLASSES
//Class expression
//const PersonCl = class {}

//Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //Instance methods
  //everything outside constructor will be on Object.prototype not on the objects themselves
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //Set property that already exist
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    //convention to add underscore -> there us new fullName variable
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //Static method
  static hey() {
    console.log('Hey there! 🖐😉');
    console.log(this); //This = Entire class
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
console.log(jessica.__proto__ === PersonCl.prototype);

console.log(jessica.age);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey, ${this.firstName}`);
// };
jessica.greet();

// 1.Classes are NOT hoisted (cant use before they are declared)
// 2.Classes are first-class citizens
// 3.Classes are executed in strict mode

const walter = new PersonCl('Walter Bell', 1965);

//
//GETTERS and SETTERS ( these pecial properties- Accessor properties)
//Normal properties- called data properties
//Check also PersonCl
const account = {
  owner: 'jonas',
  movements: [200, 150, -140],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //use it simply as a property

account.latest = 10;
console.log(account.movements);

//
// STATIC METHODS
//Array.from() is simple function that is attached to Array constructor; from method is in the array namespace
//Number.parseFloat() - static method on Number constructor (but no on numbers itself)

//With constructors
Person.hey = function () {
  console.log('Hey there! 🖐');
  console.log(this); //the entire constructor function
};
//Person.hey();
//jonas.hey(); not Working cus jonas object does not inherit it ()

//With Classes -> (add STATIC keyword), check PersonCl
//PersonCl.hey();

//
//
//OBJECT.CREATE()
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    //not a constructor f
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
// steven.name = 'Steven'; //not a good way to set properties
// steven.birthYear = 2002;
//steven.calcAge();
console.log(steven.__proto__ === PersonProto); // exactly PersonProto obj

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// Challenge 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const volvo = new CarCl('Volvo', 50);
volvo.accelerate();
volvo.brake();
const volvoUS = volvo.speedUS;
console.log('Speed in mph: ', volvoUS);
volvo.speedUS = 100;
volvo.brake();

//
//
// INHERITANCE BETWEEN CLASSES

// With Constructor f
// needed Person class (Constructor functions), Person.prototype.calcAge
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
*/

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//Linking prototypes
Student.prototype = Object.create(Person.prototype);
//Student.prototype = Person.prototype; WONT WORK (chain is not correct)

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
//mike.calcAge();

console.log(mike.__proto__ === Student.prototype); //true
console.log(mike.__proto__.__proto__ === Person.prototype); //true
console.log(mike.__proto__.__proto__.__proto__ === Object.prototype); //true

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true
console.log(mike instanceof Object); //true

Student.prototype.constructor = Student; // ???
console.dir(Student.prototype.constructor); //ƒ Person(firstName, birthYear)

//Coding challenge 3
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// Link the prototype
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with charge ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
console.log(tesla);

//
// With ES6 classes - extend + super-function
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there! 🖐😉');
    console.log(this); //This = Entire class
  }
}*/

class StudentCl extends PersonCl {
  //if parameters are the same as extended class => no need for constructor
  constructor(fullName, birthYear, course) {
    // Always need to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `i'm ${2037 - this.birthYear}, but I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// With Object.create()
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
*/
//const steven1 = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2012, 'CS');
jay.introduce();
jay.calcAge();

//
// ENCAPSUALTION - some properties/methods not accessible from outside
// Private Classfields and methods

//New JS has these:
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also static varsions)

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property: convention -> use _
    this.#pin = pin;
    //this._movements = [];
    //this.locale = navigator.language;

    console.log(`Thanks for opening an account!, ${owner}`);
  }

  // 3) Public methods
  //Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved!');
    }
    return this;
  }

  // Static
  //Only works on class ...-> Accoun.helper()
  static helper() {
    return true;
  }

  // 4) Private methods - should be with #approveLoan()... But currently it is not working with Brave browser, so use _ convention
  // #approveLoan(val){...}
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

//Use method, not this:
// acc1.movements.push(250);
// acc1.movements.push(-50);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

//console.log(acc1.#movemenets); //error

Account.helper();

//
// CHAINING METHODS
// If methods do not return anything, they return undefined
// Have to : return this (makes sens to use this if these methods set property)
acc1.deposit(300).deposit(599).withdraw(100).requestLoan(100).withdraw(100);
console.log(acc1.getMovements());

//
// Challenge 4
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with charge ${this.#charge}`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().brake().brake().chargeBattery(90);
console.log(rivian);
