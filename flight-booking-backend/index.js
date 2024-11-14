// index.js
const express = require('express');
const cors = require('cors');
const flightRoutes = require('./routes/flightroutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { sequelize, Sequelize } = require('./db'); // Sequelize import
const seedFlights = require('./seedFlights'); // Import seedFlights

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightRoutes());
app.use('/api/bookings', bookingRoutes());

// Basic route
app.get('/', (req, res) => {
  res.status(200).send('Server is running with PostgreSQL!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// Sync Sequelize models and then start the server
sequelize.sync().then(() => {
  // Call seedFlights after syncing
  seedFlights();  // Ensure this is called after sync

  app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing Sequelize models:', err);
});

module.exports = app;

