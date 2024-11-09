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

// MongoDB Connection
mongoose.connect('mongodb+srv://ronybubnovsky:dLJgXWD3YpqPDqBG@flightbooking.4cfj2.mongodb.net/?retryWrites=true&w=majority&appName=FlightBooking')
  .then(() => {
    console.log('Connected to MongoDB');

    // Call the seed function to add flight data to the database if not already present
    seedFlights(); // This will insert the flight data
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
