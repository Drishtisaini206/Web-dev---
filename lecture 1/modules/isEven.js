// modules/isEven.js
// A simple custom module to check if a number is even.

// 1. Define the function
const isEven = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    // Basic validation in case of non-number inputs.
    return false;
  }
  return num % 2 === 0;
};

// 2. Export the function for other files to use
module.exports = isEven;