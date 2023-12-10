'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-12-08T23:36:17.929Z',
    '2023-12-09T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

//Fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'short',
    };
    //const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log('----LECTURES-----');

//
//CONVERTING, CHEKING
console.log(23 === 23.0); //In JS all numbers have decimals
//Numbers internally represented in 64bits
//Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333...
//Binary 2 - 0 1. Behind the scenes cant represetn certain fractions
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

//Conversion: String --> Numbers
console.log(Number('23'));
console.log(+'23'); //does type coercion

//Parsing
console.log(Number.parseInt('30px', 10)); // Has to start with a number
console.log(Number.parseInt('px30', 10)); //NAN
console.log(Number.parseInt('01', 2)); //1 cus in Binary sytem

console.log(Number.parseInt('30'));
console.log(Number.parseFloat('  2.5rem  ')); //2.5

//Check if value is not a number ( IS NaN )
console.log(Number.isNaN(20)); //Is it not a number? --> false
console.log(Number.isNaN('20')); //Is it not a number? --> false
console.log(Number.isNaN(+'20X')); //Is it not a number? --> true
console.log(Number.isNaN(20 / 0)); //Is it not a number? --> false (dividing by zero --> gives infinity)

//Checkin if value is a number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(20 / 0)); //false (cus infinity)

console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false

//
//MATH
console.log(Math.sqrt(25), 25 ** (1 / 2));
console.log(8 ** (1 / 3)); //cubic root
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, 23, 11, 2, '23px'));
console.log(Math.min(5, 18, 23, 11, 2, '23px'));

console.log(Math.PI * Number.parseFloat('10px') ** 2); //circle area

console.log(Math.random()); // random from 0 -> 1
//Math.trunc() - līdz veselam nogriež

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min; // 0...1 --> 0...(max - min) --> min ...(max-min + min) --> min...max
console.log(randomInt(10, 20));

//Rounding integers (all do type coercion)
console.log(Math.trunc(23.6)); //23, removes decimal part
console.log(Math.trunc('-23.6')); //-23, removes decimal part
console.log(Math.round(23.6)); //24, to the nearest integer
console.log(Math.ceil(23.4)); //24, UP
console.log(Math.floor(23.6)); //24, DOWN
console.log(Math.floor(-23.6)); //-24, DOWN

//Rounding decimals
console.log((2.7).toFixed(0)); //3 (it is whire in console, cus its string)
console.log((2.7).toFixed(3)); //2.700 (also string)
console.log((2.345).toFixed(2)); //2.35 (also string)

//
//REMAINDER
console.log(5 % 2); //1
console.log(5 / 2); //5= 2*2 + 1
console.log(8 % 3); //2
console.log(6 % 2); //0

const isEven = n => n % 2 === 0;
console.log(isEven(3)); //false

labelBalance.addEventListener('click', function () {
  //querySelectorAll (not querySelector)
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//
//NUMERIC SEPARATORS - cant place two in a row, before/after a dot
//287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); //287460000000 js ignores _

const PI = 3.14_15;
console.log(PI);

//console.log(Number('230_00')); //NaN
console.log(parseInt('230_00')); //230

//
//BIGINT BigInt (ES2020)
//123n -> here n transforms numbr to BigInt
//BigInt(123); - should only be used with small numbers (?)
//Of 64 bits only 53 bits are used to store numbers
console.log(2 ** 53 - 1); //Biggest number js can save: 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // === 9007199254740991

console.log(2140786478576928752039238); //2.1407864785769288e+24
console.log(2140786478576928752039238n); //2140786478576928752039238n
console.log(BigInt(21407864785769287));

//Operations - stay the same,
console.log(1000n + 1000n);
console.log(305792048729387642734n * 1000000n);
// but cant mix with regular numbers
//console.log(305792048729387642734n * 23); // Cannot mix BigInt and other types
console.log(305792048729387642734n * BigInt(23)); // works
//Exceptions: comparisons (works on reg numbers and BigInt)
console.log(20n > 15); //works
console.log(20n === 20); //false (js does not do type coercion)
console.log(20n == '20'); // true
console.log(20n + 'is Big Int');

//Math f
//console.log(Math.sqrt(16n));//Error
console.log(11n / 3n); //3n (cuts decimal part)

//
//CREATING DATES
//Create a//const now = new Date();
//console.log(now);

console.log(new Date('Dec 10 2023 10:33:09'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5)); //Thu Nov 19 2037 15:23:05 GMT+0200 (Eastern European Standard Time)
console.log(new Date(2037, 10, 31)); //Auto corrects the date (from nov 31st to -->): Tue Dec 01 2037 00:00:00 GMT+0200

console.log(new Date(0)); //Thu Jan 01 1970 03:00:00 GMT+0300
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days 24h 60 s, 100ms  + --> Sun Jan 04 1970 03:00:00 GMT+0300

//Working with dates -
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); //10
console.log(future.getDay()); //4 (thursday)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); //2037-11-19T13:23:00.000Z
console.log(future.getTime()); //Returns TIMESTAMP --> 2142249780000 --> miliseconds that have pased since Jan 1, 1970
console.log(new Date(2142249780000)); //Thu Nov 19 2037 15:23:00 GMT+0200

console.log(Date.now()); // timestamp for now --> 1702198297954
future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:00 GMT+0200

//
//OPERATIONS WITH DATES
console.log(Number(future));
console.log(+future);

const calcDaysPassed2 = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed2(
  new Date(2037, 3, 14),
  new Date(2037, 3, 4, 10, 8)
);
console.log(days1);

//INTERNATIONALIZING DATES (Intl)

//INTERNATIONALIZING NUMBERS (Intl)
