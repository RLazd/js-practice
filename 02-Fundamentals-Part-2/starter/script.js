'use strict';
/*
STRICT MODE => 'use strict'; in the beginning for everything or before functions you want.
    create visible errors +  forbids to do certain things

    let hasDriversLicense = false;
    const passTest = true;
    
    if (passTest) hasDriverLicense = true; // => shows error
    if (hasDriversLicense) console.log('drive!');

FUNCTIONS
    piece of code that can be reused
    can accept data and give data back
    has parametrs (actual values of parameters= arguments)
    
    function logger() {
        console.log('My name is Ram!');
    }
    //calling/running/invoking function:
    logger();
    
    function fruitProcessor(apples, oranges) {
        console.log(apples, oranges);
        const juice = `Juice with ${apples} apples and ${oranges} oranges`;
        return juice;
    }
    const appleOrangeJuice = fruitProcessor(2, 3);
    console.log(appleOrangeJuice);

    Number('23'); //also a function

FUNCTION DECLARATION vs.EXPRESSIONS - choose whichever
    Declaration - use function keyword and a name
        Can call declaration in the code before its declared
    const age1 = calcAge1(1990);
    function calcAge1(birthYear) {
        return 2037 - birthYear;
    }

    Function expression => does not have a name and is stored in a variable, expressions produce values
        = function  value
        Cant call before its defined
    const calcAge2 = function (birthYear) {
        return 2037 - birthYear;
    }
    const age2 = calcAge2(1990);
    console.log(age1, age2);

ARROW FUNCITONS
    => great for one liners
    const calcAge3 = birthYear => 2037 - birthYear; //dont need curly braces if 1 line
    age3 = calcAge3(1990);

    const yearsUntilRetirement = (birthYear, firstName) => {
        const age = 2037 - birthYear;
        const retirement = 65 - age;
        console.log(`${firstNam} : ${retirment});
        return retirement;
    }

    -->Arrow functions do not allow this keyword

FUNCTIONS CALLING OTHER FUNCTIONS

In JS 2 most important data structures are: arrays & objects
ARRAYS - One of data structures
    const friends = ['Michael', 'Steven', 'Peter']; // literal syntax, 
    const years = new Array(2001, 2002, 2003);

    friends[0]; //zero based
    friends.length;
    friends[friends.lenght - 1]; // gets last element. In square brackets you need expression (not a statement)
    friends[2] = 'Jay'; //using const only primitive values are immutable...
    //we cant change all array though

    const firstName = 'Ram';
    const ramona = [ firstName, 'La', 2037-1996];

ARRAY OPERATIONS (METHODS)
    functions on arrays
    const friends = ['Michael', 'Steven', 'Peter']; // literal syntax, 
    friends.push('Jay'); //add an element in the end of an array
    friends.unshift('John'); //adds in the beginning
    friends.pop();// removes the last
    const popped = friends.pop(); // returns last element
    friends.shift(); // removes First
    
    friends.indexOf('Steven'); //returns inde xof the element; if id doesnt exist => -1
    friends.includes('Steven');// returns true/false ; does not do type coercion!!! ('23' != 23)

    //challange 6
    //return bill >= 50 && bill <=300 ? bill *0.15 : bill*0.2;

OBJECTS
    -another data structure
    DOT vs BRACKET notation
    METHODS

    const jonasArray = [
        'jonas',
        'schedm',
        2037 - 1991,
        'teacher',
        ['Michael', 'Peter', 'Steven']
    ]
    //use object for more unstructured date (arrays for structured)
    const jonas = { //obj with 5 key-value pairs. Object literal syntax!
        firstName: 'Jonas',
        lastName: 'Schmed',
        age: 2037 - 1991,
        job: 'teacher',
        friends: ['Michael', 'Peter', 'Steven']
    }
    console.log(jonas); //returns alphaetically 
    
    //Dot notation: => use FINAL property name
    jonas.lastName;
    //Bracket => can put any expression in, template literals etc.
    jonas['lastName'];
    
    //Add new property:
    jonas.location = 'Portugal';
    jonas['twitter'] = '@joanssch';
    //METHODS
    const jonas = { //obj with 5 key-value pairs. Object literal syntax!
        firstName: 'Jonas',
        birthYear: 1991,
        //age: 2037 - 1991,
        job: 'teacher',
        friends: ['Michael', 'Peter', 'Steven'],
    
        calcAge: function (birthYear) { //any function that is attached to an object is called: METHOD and you have to use an expression
            return 2037 - birthYear; //its like a property that has function value!!!
        },
    
        calcAge2: function () {
            console.log(this);
            return 2037 - this.birthYear; // if jonas.birthYear, cant rename the obj (violates DRY )
        },
    
        calcAge3: function () {
            this.age = 2037 - this.birthYear; // creates new property
            return this.age;
        }
    
    }
    console.log(jonas.calcAge(1991));
    console.log(jonas['calcAge'](1991));
    console.log(jonas.calcAge2());
    console.log(jonas.calcAge3());
    console.log(jonas.age); //lai to iegūtu, iepriekš jābūt izsauktai f, citādi - undefined

LOOPS
    -
    for (let i = 0; i < jonas.lenght; i++) {
        //do smtg
        if (typeof jonas[i] != 'string) continue;
        console.log(typeof jonas[i]);
    }
    continue - continues with nex iteration
    breaks - breaks loop (no iteration afterwards)
    //backwards
    for (let i = jonas.length - 1; i >= 0; i--) {
    
    }
    //While
    let i = 0;
    while (i <= 10) {
        i++;
    }
    let dice = MAth.trunc(Math.random() * 6) + 1;

*/






