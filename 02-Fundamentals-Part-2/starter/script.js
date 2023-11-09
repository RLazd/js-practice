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



*/



