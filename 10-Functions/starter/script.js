'use strict';
//Default Parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', undefined, 1000); //if you want to skip param - undefined

//Passing arguments: Value vs Reference. JS does not have paaing by refrence (only passing by value)
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmed',
  passport: 1234456,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 1234456) {
    //alert('Check in');
  } else {
    //alert('Wrong passport!');
  }
};
checkIn(flight, jonas);
console.log(flight); // flight number not changed, cus primitive = VALUE
console.log(jonas); //changed, cus reference type = REFERENECE (just copied reference address)
const flightNum = flight; //Passing by value
const passenger = jonas; //also reference; This is also Passing by value

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};
newPassport(jonas);
checkIn(flight, jonas);

//First-class and higher-order functions
//JS function = first-class functions (citizens) (=simply values). Functions are just another "type" of objects;
//can also return functions from functions, call methods on functions
//Higher order f - f that recieves enother f as an argument  Or returns a new function (or both, they are called callback f)
//revieves
const oneWord = function (str) {
  return str.replace(/ /g, '').toLoweCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
//higher:, JS uses callback all the time (callback functions allow to create abstraction);
const transformer = function (str, fn) {
  console.log(`Transformed string ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('Javascript is the best', upperFirstWord); //upperFistWord - is clalback funcion
const high5 = function () {
  //console.log('High five!');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
//returns
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas'); //works because of closure!
greet('Hello')('Ram');
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Yo')('Rin');

//Call & Apply methods - call(), apply(), bind()
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}, name` });
  },
};
lufthansa.book(239, 'Jonas Sch');
lufthansa.book(635, 'John Smith');
console.log(bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;
//book(23, 'Sarah Will'); // this is regular function call (not a method, so this keyword will lead to undefined)
//CALL() -> first argument always the boject that will point to this keyword
book.call(eurowings, 23, 'Sarah Will');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
//APPLY() - the same, but it doesnt recieve a list after this (but an array)
const flightData = [538, 'George Cooper'];
book.apply(eurowings, flightData);
book.call(eurowings, ...flightData);

//Bind() -does not immediately call the function but returns new function where this keyword is bound
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(23, 'Steven Wil');
const bookEW23 = book.bind(eurowings, 23); //Partial application - parts  of argument already set
bookEW23('Jon');

//With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //this is button element (without bind())

//Partial application -preset params
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); //order is important
console.log(addVAT(100));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
console.log(addTaxRate(0.23)(100));
const addVAT2 = addTaxRate.bind(0.23);
console.log(addVAT2(100));

//Challenge4
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.



HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n (Write Option Number)`
      )
    );
    if (typeof answer === 'number' && answer < 4) {
      this.answers[answer]++;
    } else {
      console.log('Not a valid answer!');
    }
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    type === 'array' && console.log('If array: ', this.answers);
    type === 'string' &&
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
