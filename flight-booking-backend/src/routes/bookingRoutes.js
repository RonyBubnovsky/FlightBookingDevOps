const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  cancelBooking
} = require('../controllers/bookingController'); // Import controller functions

// Define the routes
router.post('/', createBooking);  // POST route for creating a booking
router.get('/', getAllBookings);  // GET route to get all bookings
router.delete('/cancel/:flightName', cancelBooking); // DELETE route to cancel a booking by flight name

module.exports = router;
