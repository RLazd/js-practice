//
// MODULES
/* 
Develpoment devided in modules also 3rd party packages (managed by npm = Node package manager, use cmd)
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

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
// Old way
//lastPost.then(res => console.log(res));

// New - putside of async function
const lastPost = await getLastPost(); //without await .then wont work, cus this returns Promise
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
