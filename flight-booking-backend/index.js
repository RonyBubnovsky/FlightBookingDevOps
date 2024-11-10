const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('./routes/flightroutes');
const bookingRoutes = require('./routes/bookingRoutes');
const seedFlights = require('./seedFlights'); // Import the seed file

const app = express();
const PORT = process.env.PORT || 3001;  // Fix the PORT assignment

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

// Middleware
app.use(cors()); // Enabling Cross-Origin Resource Sharing
app.use(express.json()); // Parsing application/json

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic route
app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

// MongoDB Connection
mongoose.connect('mongodb://mongodb:27017/flightbooking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    console.log("readyState: ", mongoose.connection.readyState);
    seedFlights(); // Insert flight data
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Only start the server if the file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for testing
module.exports = app;
