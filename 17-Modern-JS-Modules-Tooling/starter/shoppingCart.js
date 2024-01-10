// Exporting module
console.log('Exporting module');

//Blocking code
/*
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finished fetching users');
*/

const shippingCost = 10;
export const cart = [];

// NAMED exports - with export keyword (exports have to happen in high-level code!)
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product}, ${quantity} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq };

// DEFAULT exp (exporting just a value, so when importing -> give any name you want)
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product}, ${quantity} added to cart`);
}
