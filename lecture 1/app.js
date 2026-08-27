// app.js
const isEven = require('./modules/isEven');
const log = require('./modules/logger');

log('Starting execution flow analysis...', 'INFO');

const numbersToTest = [4, 7, 10, 15];

numbersToTest.forEach((num) => {
  const result = isEven(num);
  log(`Is ${num} even? ${result}`, result ? 'INFO' : 'WARN');
});

log('Execution finished successfully.', 'INFO');