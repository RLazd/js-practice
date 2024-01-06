'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// https://countries-api-836d.onrender.com/countries/

//
//AJAX
// CORS- Cross-origin resource sharing (without it you cant access api through code)
// Callback hell - when theres a lot of nested callbacks for asynchronous tasks
//Old option:
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// Render error
const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
};

// Old way:
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country
    renderCountry(data);

    //Get neighbour country
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

//these are ajax --> therefore in reload data appears in different time
//getCountryAndNeighbour('portugal');
//getCountryAndNeighbour('latvia');

//
// PROMISES (to escape Callback Hell)(new option)
/*
fetch().then()...
Mehods - then((response)=>), catch(), finally()
Promise = obj as placeholder for async operation, chain them (instead of nesting) to escape callback hell.
chain of promises
Promise lifecycle  : Pending - > Settled : Fulfilled vs Rejected

finally() works after catch() because it also eturns promise


Handling rejected promises
  Only time when fetch() promise rejects is when person looses its internet connection
  2 ways to handle rejection:
    1. Second callback in then() (then chain stops there). ALL fetch().then() functions should have a second error catch callback then
       .then(
          response => response.json(),
          err => alert(err)
        )
    2. Globally - right at the end of the chain - chain(); errors propagete down the chain until they are caught
      catch(err => alert(err))
*/

const requestPromise = fetch(
  'https://countries-api-836d.onrender.com/countries/name/portugal'
);
//console.log(requestPromise);

/* With cl:

const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); //. json() method returns promise too
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

*/

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    `Country not found!`
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        `Country not found!`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} ❌`);
      renderError(`Something went wrong 💥 ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/* Reference without helper f
// Simplified without cl
const getCountryData = function (country) {
  // Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //const neighbour = data[0].borders[0];
      const neighbour = 'note exist';

      if (!neighbour) return;

      // Country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
      //return 23; // Whatever we return will become the fullfilled value
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} ❌`);
      renderError(`Something went wrong 💥 ${err.message}. Try again!`); //here err.message = new Error(`Country not found! (${response.status})`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

btn.addEventListener('click', function () {
  //getCountryData('australia');
});

/* this is still CALLBACK HELL : (chaining then method inside another then method !)
      then(data=>
        return fetch(
          `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
        )
        .then(response => response.json()
      ));

*/

//Coding challenge #1
const whereAmI = function (lat, lng) {
  let geocodingUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  fetch(geocodingUrl)
    .then(resp => {
      if (!resp.ok)
        throw new Error(
          `'Wait 3 seconds for the next request! ${response.code}`
        );
      return resp.json();
    })
    .then(data => {
      if (!data) throw new Error(`No location found!`);
      console.log(`You are in ${data.city}, ${data.countryName}!`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
      );
    })
    .then(resp => {
      if (!resp.ok) throw new Error(`Country not found! (${resp.status})`);
      return resp.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => renderError(`${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//whereAmI(19.037, 72.873);
//whereAmI(19.037, 13.381);
//whereAmI(-33.933, 18.474);

//
// EVENT LOOP : Callback + Event loop that manages Callback and Microtasks queue
// setTimeout is managed by DOM APIs
// Async tasks happen in Web APIs (not in the main thread in execution)
/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000; i++) {}
  console.log(res);
});
console.log('Test end');
*/

//
// Buillding a simple Promise
//new Promise(executor function)
//Promisifying  = convert callback based async behaviour to promise based
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🕐');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🎁');
    } else {
      reject(new Error('You lost your money! ❌'));
    }
  }, 2000);
});

//lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout()
const wait = function (sec) {
  // no need to specify reject method, cus setTimeout  always works
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

/*
wait(3)
  .then(() => {
    console.log('3 second passed');
    return wait(2);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => console.log('1 second passed'));
*/

//Call back hell
/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

Promise.resolve('Pass here resolved value').then(x => console.log(x)); // this resolves immediatey
//Promise.reject('Rejeced value').catch(x => console.error(x)); // no resolved value, so just catch

// Promisifying Geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
  });
};
//console.log('Getitng position ☢🌍');
//getPosition().then(pos => console.log(pos));

const whereAmI2 = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      //console.log(pos.coords);
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then(resp => {
      if (!resp.ok)
        throw new Error(
          `'Wait 3 seconds for the next request! ${response.code}`
        );
      return resp.json();
    })
    .then(data => {
      if (!data) throw new Error(`No location found!`);
      console.log(`You are in ${data.city}, ${data.countryName}!`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
      );
    })
    .then(resp => {
      if (!resp.ok) throw new Error(`Country not found! (${resp.status})`);
      return resp.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => renderError(`${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//btn.addEventListener('click', whereAmI2);

// // # Challange 2
// const imagesContainer = document.querySelector('.images');
// let currImg;

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const el = document.createElement('img');
//     el.src = imgPath;
//     el.addEventListener('load', () => {
//       imagesContainer.append(el);
//       resolve(el);
//     });

//     el.addEventListener('error', function () {
//       reject(new Error('Image Not Found ❌'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(el => {
//     currImg = el;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(el => {
//     currImg = el;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     createImage('img/img-3.jpg');
//   })
//   .catch(err => console.error(err));

//
// ASYNC/AWAIT
// async  - makes it look like sync (but is async)
// Synctactic sugar for Promise.then()

const whereAmI3 = async function () {
  //fetch(
  //   `https://countries-api-836d.onrender.com/countries/name/${country}`
  // ).then(res=> console.log(res));

  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    //Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Problem getting location!');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
    );
    if (!res.ok) throw new Error('Problem getting country!');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${data.city}, ${data.countryName}!`;
  } catch (err) {
    console.log(err);
    renderError(`Something went wrong. ;/// ${err.message}`);

    // Reject promise returned from async function
    throw err;
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

// const city = whereAmI3();
// console.log(city); //Promise - cus js has no idea what will be returned:
// //'You are in undefined, undefined!';

//Returning values from ASYNC functions
//!  Async+Promises ==> To just async ! using immediately invoked function expressions ! IIFE
/*
  whereAmI3()
  .then(city => console.log(city)) //if error => this (then()) is undefined (promise is still fullfilled, therefor error needs to be rethrown (added in catch part))
  .catch(err => console.log(err))
  .finally(() => console.log('3. finnally executed'));
*/
/*
(async function () {
  try {
    const city = await whereAmI3();
    console.log(city);
  } catch (err) {
    console.log(err);
  }
  console.log('3. Finished');
})();
*/

//
// TRY...CATCH
// ! Async f should use try catch blocks
try {
  const x = 2;
  x = 4;
} catch (err) {
  //alert(err.message);
}

//
// PROMISES IN PARALLEL
const get3Countries = async function (c1, c2, c3) {
  try {
    //!Promise.all(array of promises) - returns a promise
    //If one promise rejects, all reject (= promise short CIRCUITS)
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

//get3Countries('portugal', 'canada', 'tanzania');

//
// OTHER PROMISE COMBINATORS - RACE, ALLSETTLED, ANY
//PROMISE.RACE -settled as one of the input promises settls (doesnt matter wether fulfilled/rejected)
(async function () {
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
  timeout(5),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.ALLSETTLED([]) -> returns an array of all sttled promises, NEVER SHORT CIRCUITS
Promise.allSettled([
  Promise.resolve('Success1'),
  Promise.resolve('Success2'),
  Promise.reject('Fail'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.ANY [ES2021] => returns first fulfilled! (ignores rejected, otherwise similar to race)
Promise.any([
  Promise.reject('Fail1'),
  Promise.reject('Fail2'),
  Promise.resolve('Success1'),
  Promise.resolve('Success2'),
  Promise.reject('Fail3'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
//Success1

// Coding Challenge #3
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
//1
const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const el = document.createElement('img');
    el.src = imgPath;
    el.addEventListener('load', () => {
      imagesContainer.append(el);
      resolve(el);
    });

    el.addEventListener('error', function () {
      reject(new Error('Image Not Found ❌'));
    });
  });
};

const loadNPause = async function () {
  try {
    //img1
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    //img2
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';

    //img3
    img = await createImage('img/img-3.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    err => console.error(err);
  }
};
//loadNPause();

//2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async i => await createImage(i)); //returns Promise array

    //Executes parallel
    const imgEl = await Promise.all(imgs);
    console.log(imgEl);

    imgEl.forEach(img => {
      img.classList.add('.paralell');
    });
  } catch (err) {
    err => console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
