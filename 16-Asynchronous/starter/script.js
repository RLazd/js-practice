'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// https://countries-api-836d.onrender.com/countries/

//
//AJAX
// CORS- Cross-origin resource sharing (without it you cant access api through code)
// Callback hell - when theres a lot of nested callbed for asynchronous tasks
//Old option:

const renderCountry = function (data) {
  const html = `<article class="country">
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
  countriesContainer.style.opacity = 1;
};

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
    const neighbour = data.borders?.[0]; //option chaining in case no border countries
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      //console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

//these are ajax --> therefore in reload data appears in different time
//getCountryAndNeighbour('portugal');
getCountryAndNeighbour('latvia');

//
// PROMISES (to escape Callback Hell)
// Promise = obj as placeholder for async operation, chain them (instead of nesting) to escape callback hell
// Promise lifecycle  : Pending - > Settled : Fulfilled vs Rejected
const requestPromise = fetch(
  //`https://countries-api-836d.onrender.com/countries/name/${country}`
  'https://countries-api-836d.onrender.com/countries/name/portugal'
);
console.log(requestPromise);
