'use strict';
//JS = high-level, OOP, multi-paradigm programming language, interpreted (just-in-time compiled)
/*
HIGH LEVEL -  They have abstactions, but therefor it is slow
    (Low level - C --> manually manage CPU and memory
    High level - JS, Pythom)
GARBAGE COLLECTION - automatic memory cleaning
INTERPRETED/JUST-IN-TIME COMPILED - interpreted in time to machine code (0 and 1s)
MULTI-PARADIGM - 
        Paradigm - an paproach and mindset of structuring code, which will direct your codingstyle and techinque
        3 popular paradigms:
            1.Procedural programming
            2.OOP
            3.FP
        Classify as: Imperative vs Declerative
PROTOTYPE-BASED OBJECT-ORIENTED - almost everything in js is an object
FIRST-CLASS FUNCTIONS - functions are simply treated as variables
DYNAMIC - aka dynamically typed (No datatype definitions; types become known at runtime; data types can    be      automatically changed)
SINGLE-THREADED - 
        Concurrency mode - how JS engine deals with multiple tasks at a time
        JS itself runs in 1 single thread, so it can do only 1 thing at a time
        EVENT LOOP - takes long tunning tasks, executes them in the background and puts them in the main thread once they re finished

        Thread -set of instructions that is executed in CPU
NON-BLOCKING EVENT LOOP - 
        previous.


JS ENGINE AND RUNTIME
    JS ENGINE - program that executes Js code
        Ex: V8 (googles) -> it powers chorme and nodeJS (All other browsers have their own  engines)
    
    JS ENGINE conists of:
        1.CALL STACK - executes code
        2.HEAP - where objects are stored
    
    TO MACHINE CODE (options for all):
        COMPILATION- entire source code converted to machine code at once and written to binary file that can be executed by a computer
        Source code (Compilation) --> Machine Code (Execution)-->Program running
        INTERPRETATION - interpreter that runs through source code and executes it line by line
        SourceCode -(Execution line by line) --> Program running
    
    JS used to be INTERPRETED (very slow) and now it is a mix called 
    JUST-IN-TIME-COMPILATION - 
        Source Code - (Compilation) --> Machine code - (Execution)--> Program running

    JS JIT-COMPILATION:
        1.Parsing ( parsed to AST (Abstract syntax tree), check syntax errors => AST is very long for a simple cont variable)
        2.Compilation (takes AST and compiles it to machine code)
        3.Machine code executed right away
        4.Optimization (after execution->compilation->execution->optimization...)

    
    RUNTIME in the browser
        (Runtime -includes everything that we need to run js. It had:
                1.JS ENGINE
                2.WEB APIs (DOM, Timers, Fetch APIs) - everything that browser needs
                3.CALLBACK QUEUE Queue - click, timer, data - event handler from DOM. Callback functions are put into callback queue and than into call stack to be executed (and then into event loop).)
        NODE Js runtime (runs without browser)
            1.JS ENGINE (Heap + Call Stack)
            2.C++ bindings + thread pools (instead of Web APIs)
            3.CallBack Queue
        
        Therefore => there are multiple JS runtimes
    
Hosis JS code executed in Call Stack?
1.COMPILATION (already done)
2.EXECUTION (
    -Creationg of global execution context (for top level code - executed everything that is not a function --> cus they are executed only when called)
        Execution context - env in which piece of JS is executed, Stores all necessary info for some code to be executed
        It has only ONE global execution context
    -Execution of top-level code (inside global EC)
    -Execution of functions and waiting for callbacks
        -One execution per function!- For each funciton call, a new EC is created (they make together CALL STACK)

    Inside eny EC:
        1.Variable env (let, const and var declarations; functions; argument object)
        2.Scope chain (consists of refrences that are outside of current funciton)
        3.This keyword ()
        **Arrow funtions do not get arguments object and this keyword

    THE CALL STACK - ECs are stack on each other in the correct order


SCOPING AND SCOPE
    Scoping - how varibales are organized and accesed (by js enigne)
        Lexical scoping - scoping is controlled by placement of f and blocks in code (JS)
    Scope - space or env where a certains var is declared (Scope: Global, function, block)
    Scope of a variable - region where var is accessible 

    3 types o scope:
        1.Global - for top level code; outside of any function/block; accesible everywhere
        2.Function - aka Local scope
        3.Block (ES6) - accesible inside block; only applies to let & const (var is still function scoped!); functions are also block scoped (only in strict mode) 
    
    Scope chain
        =certain scope equal to adding together all the variable environments of the parent scopes
        - Child-scope has access from all its parent-scopes (last parent-scope always os global scope);
        -But parent scope does not ave access to child-scope (does not work in inner direction or side-ways, for example, if scope)
        When a variable is not in the current scope => scope lookup!
        
    
    Scope chain vs call-stack
        Scope-chain - order in which functions are written in the code (Has nothing to do with order in which they are called)
        Call stack - order in which functions are called

HOISTING
    =makes some types of variables usable in code before they are actually declared (moved to the top of the scope)
    before execution co d is scanned for variable declarations ad for each varible a new property is created in the variable env object

                                    Hoisted     Initial Value       Scope
    Function Declarations           Y           Actual function     Block (only strict mode)
    var                             Y           undefined           Function
    let, const                      N           uninitialized, TDZ  Block                   TZD - temporal dead zone
    function expressions/arrows    ---Depends weather they were made using var/let/const---

    TDZ - introduced in ES6 - accesing variabls before declaration is bad practice and should be avoided; makes const variables actually work

    why hoisting: 
        using functions before actual declaration
        var hoisting is just a byproduct
    
    Best practices: let/const; define functions first

THIS keyword
    special variable that is created for every execution context. 
    takes the value of (points to) the "owner" of the function in which the this keyword is used.

    values is not static (value is only assigned when the function is called)!!!
    Functions can be called as:
        -method: this = <object that is calling the method>
        -simple function call: this = undefined (only in strict mode)
        -arrow functions: this = <this of surrounding function (lexical this)> //arrow functions dont get their own this keyword
        -event listener: this = < DOM element that handler is atteched to>
    
    this does NOT point to the function itself and NOT the its variable env

PRIMITIVES vs OBJECTS
    Primitives: number, string, boolean, undefined, null, symbol, bigint
    Objects = Reference Types => everything else

    Js engine:
        Heap - stroes reference types
            There is address and value (but value is address in HEAP which point to object. Thats why = Reference types)
        Call stack - stores primitives (stored in EC they are used)
            Call stack hold addresses for values


*/

//SCOPES
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName); //does variable lookup

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    //this is block scope
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      //Create new cariable with same name as outter scoper variable
      const firstName = 'Steve';
      //Reassign outter scopes variable
      output = 'NEW OTUPUT!';

      const str = `Oh, and you're a millenial, ${firstName}!`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
    }
    //console.log(str); //error!
    console.log(millenial); //No error; Var is function scoped
    //console.log(add(2, 3)); //error. Functions are blocked scoped! (BUT only in STRICT MODE)
    console.log(output);
  }
  printAge();

  return age;
}
const firstName = 'Ram';
calcAge(1991);
// console.log(age); //error!
//printAge(); //error!

//HOISTING
//With variables
console.log(me);
//console.log(job);//TDZ
//console.log(year);//TDZ
var me = 'Jonas';
let job = 'teacher';
const year = 1991;
//With functions
console.log(addDecl(1, 2)); // only this you can use before declaration
//console.log(addExpr(1, 2)); //Error: not a function, trying to call undefined(2,3)
//console.log(addArrow);
//console.log(addArrow(1, 2));
function addDecl(a, b) {
  return a + b;
}
var addExpr = function (a, b) {
  return a + b;
};
const addArrow = (a, b) => a + b;

//Example
console.log('HOISTING---------');
console.log(numProducts);
if (!numProducts) deleteShoppingcart(); //deletes cus hoisting (var is defined later )
var numProducts = 10;
function deleteShoppingcart() {
  console.log('All products deleted!');
}
var x = 1;
let y = 2;
const z = 3;
//in window obect
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//THIS
console.log(window); //just global window object

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //this = undefined
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); //this = window !!! arrow functions uses lexical this (in this cas - window)
};
calcAgeArrow(1990);

const ram = {
  birthYear: 1996,
  calcAgeObject: function () {
    console.log(this);
    console.log(2037 - this.birthYear);
  },
};
ram.calcAgeObject(); //this = ram object

const matilda = {
  birthYear: 2017,
};

matilda.calcAgeObject = ram.calcAgeObject; //method borrowing
matilda.calcAgeObject(); //this = matilda obj ; returns 20

const f = ram.calcAgeObject;
f(); //undefined birthYear

//REGULAR vs ARROW f
//var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  birthYear: 1991,
  calcAge: function () {
    //console.log(this);
    console.log(2037 - this.birthYear);

    // Solution 1
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.birthYear >= 1981 && self.birthYear <= 1996); //true
    //   //console.log(this.birthYear >= 1981 && this.birthYear <= 1996); //undefined, regular function call has this=undefined => option extra variable
    // };

    //Solution 2
    const isMillenial = () => {
      console.log(this); //Jonas object (because arrow function uses this from parent scope)
      console.log(this.birthYear >= 1981 && this.birthYear <= 1996); //true
      //console.log(this.birthYear >= 1981 && this.birthYear <= 1996); //undefined, regular function call has this=undefined => option extra variable
    };

    isMillenial();
  },

  greet: () => console.log(`Hey, ${this.firstName}`), // object literal (not a code block), it is in global scope
  greetFunction: function () {
    console.log(`Hey, ${this.firstName}`);
  },
};

jonas.greet(); //Hey, undefined (if no var). If var => Hey, Matilda!
jonas.greetFunction();
jonas.calcAge();

//arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 3);
addExpr(2, 5, 8, 7);

// var addArrow = (a, b) => {
//   console.log(arguments); //arguments does not exist in arrow functions
//   return a + b;
// };
// addArrow(1, 2, 3);

//PRIMITIVES vs OBJECT
//Primitives
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);
//Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage: ', jessica);
console.log('After marriage: ', marriedJessica);
//marriedJessica = {}; - not allowed cus const

//Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicCopy = Object.assign({}, jessica2); //creates completely new object, but its SHALLOW COPY (not deep clone)
jessicCopy.lastName = 'Davis';
console.log('Before marriage: ', jessica2);
console.log('After marriage: ', jessicCopy);

jessicCopy.family.push('Mark');
jessicCopy.family.push('John');
console.log('Before marriage: ', jessica2);
console.log('After push-family: ', jessicCopy); //both objects have family with 4 fam members
//to deep clone -> add external library!
