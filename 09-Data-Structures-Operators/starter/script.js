'use strict';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  //this is object literal (using {})
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //before ES6
  //openingHours: openingHours,
  //ES6 enhanced obj literals
  openingHours,
  //ES6 syntax for methods -> no need for ': function '
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    //destructuring as an argument
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]}
      will be delivered ${time} at ${address}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}!`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
/*
//ARRAY DESTRUCTURING
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories; //JUST SKIP!
console.log(main, secondary);

//Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main]; //Raassigning values using destructuring
console.log(main, secondary);
const [starter, mainCourse] = restaurant.order(2, 1);
console.log(starter, ',', mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//DESTRUCTURING OBJECTS
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName, //changing name of key
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Default Values
const { menu = [], starterMenu: starters = [] } = restaurant; //setting default value
console.log(menu, starters);

//Mutating variables while destructing objects
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); // if start with curly braces - expected block
console.log(a, b);

//Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//SPREAD OPERATOR - works on all iterables (arrays, string, ) BUT NOT ON OBJECTS(it is not iterable)
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr]; //SPREAD operator writes each value separately
console.log(newArr);
console.log(...newArr);
console.log(1, 2, 3, 4, 5);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

//Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(...str);

//const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt(' Ingredient 2?'),
//   prompt('Ingredient 3a?'),
// ];
// restaurant.orderPasta(...ingredients);

//Objects
const newRestaurant = { foundingYear: 1998, ...restaurant, founder: 'Lui' };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);

//REST PATERNS and PARAMETERS
// pack into another array; always have to be last in destructuring
//1)Destructuring rest pattern
const arr = [1, 2, ...[3, 4]]; //SPREAD cus on the right side of =
//REST, cus on left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

//2)Functions and rest pattern = rest parameters
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
  return sum;
};
add(2, 3);
add(2, 3, 4, 5);
const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

//SHORT CIRCUITING -> && and ||
//Use any data type
//Can return any data type
//Short-circuiting evaluation - in || => if fist value is truthy => returns first value (doesnt even evluate the second)
console.log('-----||------');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null); //returns null
console.log(undefined || 0 || null || '' || 'Hello' || 23 || null);
//restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('-----&&------');
console.log(0 && 'Jonas'); //short circuits when first is falsy
console.log(7 && 'Jonas'); //when everything is truthy => returns last value. Only true when all operands are false
console.log('Hello' && 23 && null && 'Ram');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); //if .orderPizza is falsy => it doesnt evn evaluate second statement

//NULLISH COALESCING OPERATOR
restaurant.numGuests = 0;
// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// LOGICAL ASSIGNMENT Operators - ||= ??= &&=
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
// AND assignment operator = assign a value to variable if current value is truthy
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

//Challenge
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);
const [gk, ...fieldPlayers] = players1;
console.log(fieldPlayers);
console.log(gk);

const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const {
  odds: { team1, x: draw, team2 },
} = game;
const printGoals = function (...playerNames) {
  let sum = playerNames.length;
  for (let i = 0; i < playerNames.length; i++) {
    console.log(playerNames[i], ', total sum of all: ', sum);
  }
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);
team1 > team2 && console.log('More likely to win: ', game.team1);
team2 > team1 && console.log('More likely to win: ', game.team2);

//FOR-OF LOOP
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`); //[0,'Pizza']
}
console.log(menu.entries()); //Array Iterator {}
console.log(...menu.entries()); // [0, 'Pizza'], [1, 'Pasta'] etc

//ENHANCED OBJECT LITERALS - objects & methods & property names (compute)
console.log(restaurant.openingHours);

//OPTIONAL CHAINING ?. => if certain prop does not exist -> returns undefined immediately
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open); //if mon -> undefined; if mon.open -> error
console.log(restaurant.openingHours.mon?.open); // undefined
console.log(restaurant.openingHours?.mon?.open);
//Ex
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //nullish operator
  console.log(`On ${day} we open at ${open}`);
}
//Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); //call if exists
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); //call if exists
//Arrays
const user = [{ name: 'Ram', email: ' hello@gmail.com' }];
console.log(user[0]?.name ?? ' User array is empty');

//LOOPING OBJECTS: Obj Keys, Values, Entries
//property NAMES
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open ${properties.length} days a week- `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day},`;
}
console.log(openStr);
//property VALUES
const values = Object.values(openingHours);
console.log(values);
//ENTRIES - names+values
const entries = Object.entries(openingHours);
console.log(entries);
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//1. =>entries method (array.entries())
for (let [i, el] of game.scored.entries()) {
  console.log(`Game ${i + 1} : ${el}`);
}
//2.=> count average of Object.values();
const odds = Object.values(game.odds);
let sumOfOdds = 0;
const count = odds.length;
for (const odd of odds) {
  sumOfOdds += odd;
}
console.log(sumOfOdds / count);
//3. Object.entries(object)
for (const [team, odd] of Object.entries(game.odds)) {
  let teamName = game?.[team] ?? 'draw';
  console.log(`Odd of ${teamName} : ${odd}`);
}
//4.=>
const scorers = {};
for (let scorer of game.scored) {
  scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}
console.log(scorers);

//SETS - a collection of unique values, no indexes. (.size, .has(), .add(), .delete(), .clear(), [ ...new Set(array)])
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
console.log(ordersSet);
console.log(new Set('Jonas')); //=> {'J', 'o', 'n', 'a', 's'}
console.log(ordersSet.size);
console.log(ordersSet.has('Pasta'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.delete('Garlic Bread');
//ordersSet.clear();
for (const order of ordersSet) console.log(order);
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(new Set('Ramona').size);

//MAPS - key:value pairs (keys can be of any type (unlike objects where keys are usually strings))
// .set() .get() .delete() .size .clear
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size); //7
//rest.clear();
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.get([1, 2])); //undefined , cus [1,2] != [1,2] in the heap !!!!
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr));
rest.set(document.querySelector('h1'), 'Heading');

const question = new Map([
  ['question', 'what is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JS'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
console.log(question);
//convert Obj to Map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//iteration in Maps
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key} : ${value}`);
  }
}
//let answer = Number(prompt('Your answer'));
let answer = 0;
console.log(question.get(answer === question.get('correct')));

//convert Map to Array
console.log(...question);
//console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

//Simple list- array, sets
//Key/Value pairs - Objects or maps

//Challange 3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1.
const events = [...new Set(gameEvents.values())];
console.log(events);
//2.
gameEvents.delete(64);
console.log(gameEvents);
//3.
const timeOfGame = [...gameEvents.keys()].pop();
console.log(
  `An event happened on average every ${timeOfGame / gameEvents.size} minutes`
);
//4.
for (const [key, value] of gameEvents) {
  console.log(`${key <= 45 ? 'FIRST HALF' : 'SECOND HALF'} : ${key} ${value}`);
}

//STRINGS
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log('B373'[1]);
console.log(airline.length);
//Methods -indexOf(), lastIndexOf(), slice(), toUpper/LowerCase(), trim(), replaceAll(), split(), join(), padStart()
//Boxing - js takes every string (primitive type) and makes an string object from it=> then you can call methods on a string
console.log(new String('Ram'));
console.log(typeof new String('Ram').slice(1));

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); //8
console.log(airline.slice(4, 7)); //Air = substring (end value not included)
console.log(airline.slice(0, airline.indexOf(' '))); //TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Last word, +1 to not include space
console.log(airline.slice(-2)); //from end
console.log(airline.slice(1, -1)); //AP Air Portuga

const checkMiddleSeat = function (seat) {
  //B and E are middle
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You ve got middle seat');
  } else {
    console.log('You got lucky!');
  }
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toLocaleUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);
//Comparing email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const normalizedEmail = loginEmail.toLowerCase().trim();
//Replacing
const priceGB = '288,97EUR';
const priceUS = priceGB.replace('EUR', '$').replace(',', '.');
console.log(priceUS);
const announcement =
  'All passangers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); //regex
//Booleans
const plane2 = 'A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.startsWith('Air'));
if (plane2.startsWith('A320') && plane2.endsWith('neo')) {
  console.log('Part of new airbus family!');
}
//Practice
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowen on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('A have a laptop, food, posket kNife');
checkBaggage('A have an umbrella, socks and camera');

//Split and join
console.log('A+very+nice+string'.split('+'));
console.log('Jonas Schemd'.split(' '));
const [firstName, lastName] = 'Jonas Schemd'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join('-');
console.log(newName);
const passenger2 = 'jessica and smith davis';
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica and smith davis');
//Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+')); //25 -> how long string should be
console.log(message.padStart(25, '+').padEnd(35, '+'));
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(247124645));
//Repeat
const message2 = 'Bad weather...All departures delayed';
console.log(message2.repeat(5));

//Practice4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  console.log(text);
  // const splittedText = text.split('\n');
  // console.log(splittedText);
  // let finalString = '';
  // for (const [i, el] of splittedText.entries()) {
  //   //console.log(el);
  //   let elSplitted = el.toLowerCase().trim().split('_');
  //   //console.log(elSplitted);
  //   let camelCase = [];
  //   for (const [i, word] of elSplitted.entries()) {
  //     if (i === 0) {
  //       camelCase.push(word);
  //     } else {
  //       camelCase.push(word[0].toUpperCase() + word.slice(1));
  //     }
  //   }
  //   finalString += camelCase.join('').padEnd(17) + '✅'.repeat(i) + '\n';
  // }
  // console.log(finalString);
  //Jonas way:
  const rows = text.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output =
      `${first}${second.replace(second[0], second[0].toUpperCase())}`.padEnd(
        17
      ) + '✅'.repeat(i + 1);
    console.log(output);
  }
});

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(50);
  console.log(output);
};
*/
