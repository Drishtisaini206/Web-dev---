// app.js
const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware to parse incoming JSON payload in requests
app.use(express.json());

// 2. Custom Logger Middleware
app.use(logger);

// 3. Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Student Management REST API');
});

// 4. Student Routes
app.use('/students', studentRoutes);

// 5. Handle Unknown Routes (404 Error Handling)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});