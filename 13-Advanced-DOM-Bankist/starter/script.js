'use strict';

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //.querySelectorAll() -> nodeList
const btnScrollTo = document.querySelector('.btn--scroll-to');
const allSections = document.querySelectorAll('.section'); //NodeLists do not update themselves
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
///////////////////////////////////////
//
//Menu fade animation
//mouseenter does not bubble, but mouseover does bubble
const handleHover = function (e) {
  //console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Passing "argument" into handler (event handler can have only 1 argument - event)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//
// Page navigation (navigation bar)
//EVENT DELEGATION
// 1. Add eventListener to common parent element
// 2. Detrmine what element originated event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behaviour: 'smooth',
    });
  }
});

//Not effective way to navigate:
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behaviour: 'smooth',
//     });
//   });
// });

///////////////////////////////////////
//
//Sticky Navigation : the scroll event
/* Bad practice (bad performance)
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  //as soon as 1-section is reached -> make nav sticky
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  nav.classList.add('sticky');
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //entire view
  threshold: 0,
  rootMargin: `-${navHeight}px`, //when distance between the  start of the section and the viewport is the same as the navigation
});
headerObserver.observe(header);

///////////////////////////////////////
//
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  //Modern way to scroll
  section1.scrollIntoView({
    behaviour: 'smooth',
  });
  //Old School
  /*
  const s1coords = section1.getBoundingClientRect(); //DOMRect element
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll (x/Y)', window.pageXOffset, pageYOffset); //30 0
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); //1066 1474

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behaviour: 'smooth',
  });

  */
});

///////////////////////////////////////
//
//Reveal elements on scroll
//const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //stop observing
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //root:null===viewport
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

///////////////////////////////////////
//
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
//
// Tabbed component
//Not good practice: tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //closest to not click on span element
  ///console.log(clicked);

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
//
//Lazy loading images (to improve performance)
const imgTargets = document.querySelectorAll('img[data-src]'); //selecting all el where img class has data-src property
const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // Cant remove the class too quickly, so: use addEventListener
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//
//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  //const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  //...For testing:
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';
  //...

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) //Selecting element based on a value in []
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    //1st 0%; 2nd - 100%, 200%, 300%
  };

  //Next  and previous slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Init
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //destructuring
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////
///////////////////////////////////////
//!LECTURES

/* DOM - interface between js and browser
Every Node in the DOM tree is type of node (in JS represented as an obj).
Node has child types: 
  Element - HtmlElemnts has childTypes - buttons, imgs, divs....
  Text - <p></p>
  Comment
  Document

Document and Element both have .querySelector()

Event Target is parent element of Node (an its child types). Event Target is never made it works behind the scenes
 */

//SELECTING ELEMENTS
console.log(document.documentElement); //entire html
console.log(document.head);
console.log(document.body);

//const allSections = document.querySelectorAll('.section'); //NodeLists do not update themselves
console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button'); // returns HTMLCollection, Collection updates itself
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // live HTMLCollection

//CREATING ELEMENTS
/*
 */
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

//STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // does not work (is inside css)
console.log(message.style.backgroundColor); // works -rgb(55, 56, 61), cus this is inline style (we set in in js)
//console.log(getComputedStyle(message)); // returns obj -> CSSStyleDeclaration
console.log(getComputedStyle(message).height); // works

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.src); //http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.designer); //undefined, cus not a standart property for images
console.log(logo.className); //nav__logo

logo.alt = 'Beautiful minimalist logo';

//non-standart
console.log(logo.getAttribute('designer')); // ok, 'Jonas'
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //Absolute :  http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.getAttribute('src')); // Relative  :  img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/#
console.log(link.getAttribute('href')); //#

//Data attributes - they start with data..
console.log(logo.dataset.versionNumber); //data attributes--> in camelCase

//CLASSES
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c', 'j');
logo.classList.contains('c', 'j');

//Do not use (cus it will override all existing classes)
logo.className = 'jonas';

// ! EVENTS -addEventListener is better, but for all events there are onmouseenter, on...
//addEvenetListner better cus :
// 1.add multiple event listeners to the same event;
// 2.remove event handler in case we dont need it anymore
let h1 = document.querySelector('h1');
const alertH1 = function (e) {
  //alert('addEventListener: You re reading heading!');
  //h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You re reading heading!');
// };

//EVENTS : BUBBLING & CAPTURING
//Capturing happens in the document (CAPTURING phase) and then travels down to the element,
//where TARGET phase starts
//BUBBLING phase - events bubble up from target to the document root
// ! => event happen in the same parent elements
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
/*
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); //target: nav__link (event bubbling: event originates here but it bubbles up to its parent elements, therefore we can handle it in the parent elements )
  //currentTarget is this and differs

  //Stop propagation (in general it's not a good idea)
  //e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget); //target: nav__link or nav_links
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget); //target: nav__link or nav_links or nav
  }
  true
  Capturing phase usually is irrelevant (Bubbling allows for event delegation)
  Can set second parameter as TRUE to addEventListener() --> CAPTURING happens --> first element is NAV (as it starts listening when capturing happens)
);
*/

//
//EVENT DELEGATION - look Page navigation

//
//DOM TRAVERSING - walking through the DOM (select element based on another element)
h1 = document.querySelector('h1');

//Going downwards : children
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // [text, comment, text, comment, text, span.highlight, text, br, text, span.highlight, text] - Nodes can be anything
console.log(h1.children); // live collection :  [span.highlight, br, span.highlight]
//h1.firstElementChild.style.color = 'white';
//h1.lastElementChild.style.color = 'orangered';
console.log(h1.firstElementChild);

//Going upwards: parents
console.log(h1.parentNode); //div.header__title
console.log(h1.parentElement); //div.header__title (in this case the same)
//h1.closest('.header').style.background = 'var(--gradient-secondary)';
//h1.closest('h1').style.background = 'var(--gradient-primary)'; // selecting itself

//Sideways: siblings (can access only direct)
console.log(h1.previousElementSibling); //null
console.log(h1.nextElementSibling); //h4
//sibling nodes:
console.log(h1.previousSibling); //#text
console.log(h1.nextSibling); //#text
//All siblings including itself
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  //if (el !== h1) el.style.transform = 'scale(0.5)';
});

//
// STICKY NAVIGATION
//The INTERSECTION OBSERVER API
//callback function gest called when observed (target) element is intersecting the root element at the defined treshold
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2], //percentage that we want to have visible in the root
  //0 -> event will triger always when target element moves completely  out of he view and also as soon as it enters the view
  //0.2 ->
  //1 -> callback called when target is visible 100%
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

//
//LIFE-CYCLE
/* Events
Can see in NETWORK tab
1.DOM Content loaded - as soon as html has been completely parsed (but all scripts have to be executed before). No images, just HTML and JS
2.LOAD event - when all images, external resources (css) has been loaded
3. BEFORE UNLOAD - before closing/reloading a page
 */
document.addEventListener('DOMContentLoaded', function (e) {
  //Execute code only after the dom is ready: (but js script tag is in the end of html, so we dont need to listen to DOMContentLoaded)
  console.log('HTML parsed & DOM tree built!');
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded ', e);
});

// window.addEventListener('beforeunload', function (e) {
//   //not sure this is working (asks for reloading, but not when closing page)
//   e.preventDefault(); //in chrome not necessary
//   console.log(e);
//   e.returnValue = '';
// });

//
//LOADING JS IN TML
//1.Regular - never include in the head; just include it in the end of the body
//2.Async - In head; Html parsing paralel with js script fetching; DOMContentLoaded does not wait for an async script. Good for old browsers.
//Script not guaranteed to execute in order. Use when order doesnt matter (analytics)
//3.Defer - Overall best execution!!!! In head; still async, but html parsing is not interrupted and execution of js happens in the end. DOMContentLoaded fires after defer script is executed and IN order.
