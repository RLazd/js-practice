'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// Functions
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //similar to .textContent = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
          <div class="movements__value">${mov} €</div>
        </div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // options for first - afterbegin,  beforeend;.insertAdjacentHTML is quick and dirty DOM manipulation
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}`;
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
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //assigment happens from riight to left
    inputLoginPin.blur(); //field loses its focus
    //Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAccount);
  //Clean input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount.username !== currentAccount.username
  ) {
    //Transfer
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //Clean input fields
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //Delete account
    accounts.splice(index, 1);
    //indexOf() --> is simpler (.indexOf(23)
    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Method - function attaced to an object
//SIMPLE ARRAY METHODS (functions attached to array objects)
//slice() -soes not mutate original array
let arr = ['a', 'b', 'c', 'd', 'e'];
arr.slice(2, 4);
arr.slice(-2); //[d,e]
arr.slice(1, -1); //[b,c]
arr.slice(); // = shallow copy
//splice() - mutates original array
arr.splice(2, 4);
console.log(arr); //[a,b]
//reverse() - mutates original
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse();
console.log(arr2);
//concat()
const letters = arr.concat(arr2);
console.log(letters); //['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]);
//join()
console.log(letters.join('-')); //a-b-c-d-e-f-g-h-i-j
//at()
const arr3 = [23, 11, 64];
console.log(arr3.at(0));
//getting last element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));
console.log('Ramon'.at(-2));

//FOREACH - is higher order f (requires clalback f)
//foreach(currentElement, index, wholeArray) ; forEach - does not accept break !
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.forEach(function (movement, i, array) {
  movement > 0 && console.log(`You deposited ${movement + 1}`);
  movement > 0 &&
    console.log(`Movement  ${i + 1}: You withdrew ${Math.abs(movement)}`);
});

//ForEach - maps & sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//map.forEach
//forEach(curentValue, key, wholeMap)
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
//set.forEach(currentValue, key (not used!!!), wholeSet)
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'USD', 'EUR']);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); //USD:USD, GBP:GBP ....Sets do not have keys...
});

//MAP method (map method calls the callback function)
const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUsd);
}
console.log(movementsUsdFor);

const movementsDescriptions = movements.map((mov, i) => {
  //(mov, i, arr)
  return `Movement  ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(mov)}`;
});
console.log(movementsDescriptions);

//FILTER //(mov, i, arr) - but usually you need just current element
const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(deposits, withdrawals);
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

//REDUCE //(function(acc, curr, i, arr){}, accumulatorStartValue)  Acc = accumulator
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration: ${i} : ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
//Max value
const maxMovement = movements.reduce(
  (acc, mov) => (acc = mov > acc ? mov : acc),
  movements[0]
);
console.log(maxMovement);

//Challange2
const calcAverageHumanaAge = function (ages) {
  const ageInHumanYears = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18);
  console.log(ageInHumanYears);
  // const averageAge =
  //   ageInHumanYears.reduce(function (acc, age, i, filteredAges) {
  //     return acc + age;
  //   }, 0) / ageInHumanYears.length;
  const averageAge = ageInHumanYears.reduce(
    (acc, age, i, filteredAges) => acc + age / filteredAges.length,
    0
  );
  return averageAge;
};
const test1 = [5, 2, 4, 1, 15, 8, 3];
console.log(calcAverageHumanaAge(test1));

//CHAINING METHODS - like a pipeline; bad practicie to chain methods that mutate original (splice())
const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  // .map((mov, i, arr) => {
  //   //arr allows for debugging
  //   console.log(arr);
  //   return mov * eurToUsd;
  // })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUsd);

//Challenge3
const calcAverageHumanaAge2 = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, filteredAges) => acc + age / filteredAges.length, 0);
console.log(calcAverageHumanaAge2(test1));

//FIND() - returns first element (not an array!) that satisfies callback f-s condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//FINDINDEX(cur, arr)

//SOME()
console.log(movements);
//.includes() checks equality
//.some() - specify condition
console.log(movements.includes(-130));
console.log(movements.some(mov => mov === -130));
const anyDeposits = movements.some(mov => mov > 0);

//EVERY() - true if all elements satisfy condition
console.log(movements.every(mov => mov > 0));

//Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//FLAT() - 1 level deep by default, but flat(2) - 2 levels deep
const arrToFlat = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrToFlat.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//FLATMAP() - flat() + map(); only goes 1 level down! (if more levels--> use flat(2) etc.)
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

//SORT (currentVal, nextVal) - mutates original
//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);
//Numbers - DOES sorting based on STRINGS
console.log(movements);
//console.log(movements.sort());

//return <0 -> A,B (keep order)
//return >0 -> B,A (switch order)
//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
//Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
