'use strict';
/*DOM - js interacting with webpage
Document Objecy Model
structured representation of html documents. allows js to access html elements and styles to manipulate them


DOM always starts with Document object (special entry point document.querySelector();)
First element is <html> , which has 2 childs < head> and <body> 

DOM is not part of JS! It's just part of ecma script...(!!!)
DOM (its methods, properties) are part of WEB APIs (thay are like libraries that browser implements and js can use);

Simple exmaple:
//select element with class message (if id -use #)
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number! ✨';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 21;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

/*Handling Click --> need an Event listener (An Event is anything that happens on the page - mouse click, moving, key press etc.)
We want to listen on the button

addEvenetListener() is a method, that takes an arogument (specific event) and function (what to do when the even happens)

function
*/
let secretNumber = Math.trunc(Math.random() * 20) + 1; //Math - an object and random() a method, generates random form 0 to 1
let score = 20; //State variable -> score is relevant to state of the application (you want this to be aivalable in code not just DOM)
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //When no input
  if (!guess) {
    displayMessage('No number! ❌');

    //When player wins
  } else if (guess === secretNumber) {
    displayMessage('Correct Number! ✨');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347'; //element name, cus no class
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high! 😋' : 'Too low! 😋');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game! 😞');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = ''; //for input just value not textContent
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222'; //element name, cus no class
  document.querySelector('.number').style.width = '15rem';
});
