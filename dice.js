// dice.js
const crypto = require('crypto');

function rollDice() {
  // Generate a cryptographically random byte (0 to 255)
  const randomByte = crypto.randomBytes(1)[0];
  // Map value to a dice range of 1 to 6
  return (randomByte % 6) + 1;
}

// Display single roll
console.log(`Dice Rolled: ${rollDice()}`);

// Simulate multiple rolls using a loop
console.log('\nSimulating Multiple Dice Rolls:');
for (let i = 1; i <= 5; i++) {
  console.log(`Roll ${i}: ${rollDice()}`);
}