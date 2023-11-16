'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal'); //needs All cus multiple, otherwise - just first

const openModal = function () {
  console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  //modal.computedStyleMap.display = 'block'; //opposite of display: none
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsShowModal.length; i++)
  btnsShowModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal); //if it is closeModal() -> it calls the function as soon as possible not on click event!
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  //e stands for event
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/*
keydown - any key pressed
keyup
keypress
*/
