// modules/logger.js
// Handles timestamp logs and colored output using ANSI escape codes.

function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();

  // ANSI escape codes for colored terminal output
  const colors = {
    INFO: '\x1b[32m',  // Green
    WARN: '\x1b[33m',  // Yellow
    ERROR: '\x1b[31m', // Red
    RESET: '\x1b[0m'   // Reset color
  };

  const color = colors[level.toUpperCase()] || colors.INFO;
  console.log(`${color}[${timestamp}] [${level.toUpperCase()}]: ${message}${colors.RESET}`);
}

module.exports = log;
