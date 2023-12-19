'use strict';
//OOP - overview

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
