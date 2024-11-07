// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flightName: String,  // Store the flight name
  // Add other fields for booking (e.g., user information, date, etc.)
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
