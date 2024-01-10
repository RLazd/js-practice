//
// MODULES
/* 
Develpoment devided in modules also 3rd party packages (managed by npm = Node package manager, use cmd (software and ackage repository))
1.Develpoment : multiple modules and 3rd party packages
2.Build process: Bundling, Transpiling/polyfiling (convert back to ES5, usually done by Babel)
3.Production (JS Bundle)

Module = reusable piece of code that encapsulates implementation details, usually a standalone file
    can have imports/export. 
    Imported = dependancies
    Exported is called public API
    Modules - make it easy to build software (small building blocks)

ES6 - NATIVE JS MODULES
-modules stored in fles, exactly one module per file

*/

//IMPORTING MODULE
console.log('Importing module');

//NAMED imports/exports
/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // Exporting code is xcuted first!!!
Calling NAMED export - But
addToCart('bread', 5);
console.log(price, tq); // not totalPrice but price
*/

//Importing everything
/*
import * as ShoppingCart from './shoppingCart.js'; //creates ns
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);
*/

// DEFAULT exports
import add from './shoppingCart.js';
add('pizza', 2); //named add is function from default f i nshoppingCart.js

// Can mix named and default, but should not:
//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

//Live connection: (Exports are not copy of code!)
import { cart } from './shoppingCart.js';
add('bread', 2);
add('apples', 2);
console.log(cart);

//TOP LEVEL AWAIT (ES2022) - use await keyword outside functions (!) in modules (<script type="module.../>")
// but it blocks execution of module
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
*/
// Old way
//lastPost.then(res => console.log(res));

// New - putside of async function
//const lastPost = await getLastPost(); //without await .then wont work, cus this returns Promise
//console.log(lastPost);

//
// THE MODULE PATERN
//+ : encapsulate functionality, expose public apis
// basically have access only to things that are returned
const ShoppingCart2 = (function () {
  const cart = [];
  const shipppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${product}, ${quantity} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${product}, ${quantity} added to cart`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);

// COMMON JS MODULES-  used in NodeJS
// export.addToCart2 = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${product}, ${quantity} added to cart`);
//   };
//Import
//const { addToCart } = require('./shoppingCart.js');

//
// INTRO TO CMD
// dir OR ls- contents of directory
// cd - change dirctory
// cd../..
// mkdir - make directory
// echo "" > [filename] - new file
// del
// mv [filename] [loc] - parent folder = ../
// rmdir - removedirectory (but empty)
// rm -R [ folder] - ok for not empty dirs

// !NPM
/*
Start by npm init => that will make package.json file

npm i/install [package_name] -> will create add dpenedency in package.json && package-lock & node_modules (which include leaflet-lib code)

Never include node_modules folder!

npm i- will add all dependancies from package.json

!PARCEL - module bundler
build tool thats on npm too (Dev dependancy, used to develop project)
Installing: npm i parcel --save-dev 
Use it in cmd: 
  npx parcel index.html
  OR
  execute usin npm scripts: in package.json

Does not work for locally installed depandancies (use npx parcel [entrypoint]).
Entrypoint - basically what you want to bundle up - here basically script.js (from html) -> shoppingCart.js, deepClone, 
+ when run starts a new development server

In Parcel you can activate hot module replacement

Install packages globally: 
  npm i parcel -g
*/

//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; //Parcel finds path automatically, will work with common ES modules

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// Creating deep clone !
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone); //changed to false, changes The Original
console.log(stateDeepClone); //still true, keeps original values

// Hot module replacement (only Parcel understand);
// Whenever we re doing this -> new module inserted in browser without triggering new page reload
if (module.hot) {
  module.hot.accept();
}

// TRANSPILING, POLYFILLING
/*
lecture 280
Parcel automatically uses Babel polyfilling,
u can configure it, but default is mostly used

@babel/present-env - include only final features
*/

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

//ES6 methods - experimantl in babel --> its still not converted to ES5 as in the lecture)
//Babelcan only transpile ES6 syntax (arrow, spread operator, const-> var), but not new features that are added to the language (methods- find...etc.) NOW it is working though, maybe new ones are not working
/*
TRANSPILING - for syntax (class to function, so it would work in older browsers)
POLYFILLING - for built-in functions (for example at(), find() etc)

*/

console.log('Jonas' ?? null);
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// NEW features have to polyfill -> add a library: import 'core-js/stable', but before install it manually npm i core-js
import 'core-js/actual'; //THIS SHOULD BE ON TOP!!!
//import 'core-js/stable/array/find' -> to include concrete features (allows to reduce bundle size)

// Browserlist in package.json: => support for Internet Explorer 11

// Polyfilling async functions
import 'regenerator-runtime/runtime';

//Review: Clean and Modern JS
//Lets fix this code: clean.js
