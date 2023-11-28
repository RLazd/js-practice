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

//Passing arguments: Value vs Reference. JS does not have paaing by refrence (only passing by reference)
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmed',
  passport: 1234456,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 1234456) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
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
