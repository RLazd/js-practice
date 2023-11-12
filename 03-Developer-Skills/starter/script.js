// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// do not reload browser manually --> use LiveSaver
console.log("Hello");
//nodeJs to install LiveServer: npm install live-server -g
//live server automatically opens index.html file
//lao atvertu terminālī jāieraksta "live-server"
console.log("Live server reloaded on its own");
//console.table(); --> shows objects as a table

// Debugging with the Console and Breakpoints
const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",

    // C) FIX
    // value: Number(prompt('Degrees celsius:')),
    value: 10,
  };

  // B) FIND
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) IDENTIFY
console.log(measureKelvin());

const printForecast = (arr) => {
  let finalString = "";
  //if (typeof arr !== 'array') continue;
  for (let i = 0; i < arr.length; i++) {
    finalString = finalString.concat(`...${arr[i]} in ${i + 1} days`);
  }
  return finalString;
};

debugger;
console.log(printForecast([17, 21, 23]));
