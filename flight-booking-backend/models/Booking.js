// models/Booking.js
const mongoose = require('mongoose');

// Define the schema for bookings
const bookingSchema = new mongoose.Schema({
  bookedName: { type: String, required: true },
  bookedDeparture: { type: String, required: true },
  bookedDestination: { type: String, required: true },
  bookedPrice: { type: Number, required: true }
});

// Create the Booking model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
