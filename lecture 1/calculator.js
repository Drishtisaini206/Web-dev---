// calculator.js
// A basic command-line calculator using process.argv.

// 1. Get arguments. Skip the first two (node path and script path).
const args = process.argv.slice(2);

// 2. We need three arguments: operation, number1, number2.
const operation = args[0];
const num1Str = args[1];
const num2Str = args[2];

// 3. Simple input validation: make sure all are present and numbers are valid.
if (args.length !== 3 || isNaN(num1Str) || isNaN(num2Str)) {
  console.log('Error: Invalid input format.');
  console.log('Usage: node calculator.js <add|sub|mul|div> <num1> <num2>');
  process.exit(1); // Exit with a non-zero status code to indicate an error.
}

// 4. Convert string arguments to numbers.
const num1 = parseFloat(num1Str);
const num2 = parseFloat(num2Str);
let result;

// 5. Perform the requested operation using a switch statement.
switch (operation.toLowerCase()) {
  case 'add':
    result = num1 + num2;
    break;
  case 'sub':
    result = num1 - num2;
    break;
  case 'mul':
    result = num1 * num2;
    break;
  case 'div':
    // Handle division by zero.
    if (num2 === 0) {
      result = 'Error: Division by zero is not allowed.';
    } else {
      result = num1 / num2;
    }
    break;
  default:
    result = 'Error: Invalid operation. Use add, sub, mul, or div.';
}

// 6. Display the result in the terminal.
console.log(`Result: ${result}`);