/*
Variables notes
    naming conventions:
        camelCase
        can start _ and $
        uppercase - reserved for constants (PI = 3.14....)
        cant start with a number
        cant contain &,
        cant use reserved keywords (ex: new)
        should be descriptive
*/
// console.log("Jonas");
//Value-> smallest unit of info
//Store values in variables:
// let firstName = "Ram";
// console.log(firstName);
// console.log(firstName);


/*
Data Types
    Primitive - number(always foating point), string, boolean, 
        undefined (variable that has been declared but without a value),
        null,
        symbol (ES2015, value that is unique)
        bigInt (ES2020)
        
        js has dynamic typing => automaticalls detects data type (SO VALUE has a type not the VARIABLE)

        
        let example = true;
        console.log(typeof example);
        console.log(typeof "true");
        
        example = "true";
        console.log(example);
        
        let year
        console.log(year);
        console.log(typeof year);
        
        console.log(typeof null); //returns object, but should return undefined
*/

/*
let 
const - not supposed to change!!
var - old way, basically never use this

shoul always use const => if needs to change -> than 
let age = 310;
age = 31;
const birthYear = 1991;
//birthYear = 1990; // => Uncaught TypeError: Assignment to constant variable.
//const job; //=> Missing initializer
var job = 'programmer';
job = 'teacher';

lasName='Sch'; //terrible idea
*/

/*
Basic operators
    Arithmetic
    Assignmnet operator: = 
    Comparison operator 
    console.log(2 ** 3); //2*2*2
    
    let x = 10 + 5;
    x += 10;
    x *= 4;
    x++;
    x--;
    console.log(x);
*/

/*
Operator precedence
    Math before comparison
    mostly left to right, but right-> left exponential (...**...)
*/

/*
Concatenate strings with + 
Template literals - better version, use ``

const firstName = 'Ram';
const ram = "I'm " + firstName;
console.log(ram);
const num = 2;

const ramNew = `I'm ${firstName} new, ${num + 4}`;
console.log(ramNew);

//MultiLine string
console.log(' String with \n\
multiple \n\
lines');

console.log(`String with
multiple
lines using template literal`);
*/

/*
If-Else

*/

/* 
Type conversion and coercion
    Conversiona - manually
    Coercion - implicit

    //conversion
    const inputYear = '1991';
    console.log(Number(inputYear), inputYear);
    console.log(typeof NaN);
    console.log(String(23), 23);
    
    //coercion 
    //(number converted to string)
    console.log('i am ' + 23 + 'years old');
    // if minus => string converted to number, but if + => numbers to strings
    console.log('23' - 3);
    console.log('23' + 3); //233
    
    let n = '1' + 1;
    n = n - 1;
    console.log(n);
    
    let nn = 2 + 3 + 4 + '5';
    console.log(nn);
    console.log('10' - '4' - '3' - 2 + '5'); //15
*/

/*
Truthy Falsy values
    Falsy: 0, '', undefined, null, NaN (converted to false when converted to boolean)
    Truthy: any number that is not 0, or any not empty string

    converted in if/else and logical-operators
    console.log(Boolean(0)); //f
    console.log(Boolean(undefined)); //f
    console.log(Boolean('Jonas')); //t
    console.log(Boolean({})); //t
    
    const height = 0;
    if (height) {
        console.log("height ir defined");
    } else {
        console.log("height ir UNdefined");
    
    }
*/

/*
Equality operators
    === Strict, does not coert types. Always use this!
    == Loose, does type coercion
    !== Strict
    != Loose
    const age = 18;
    if (age === 18) console.log("You just became an adult!");
    
    const favourite = prompt("What is your favourite number?");
    console.log(favourite);
    console.log(typeof favourite);

Boolean Logic
    AND &&
    OR ||
    NOT !


Logical Operators
*/