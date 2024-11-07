// routes/bookingRoutes.js
const express = require('express');
const Booking = require('../models/Booking'); // Import the Booking model
const router = express.Router();

// POST route for creating a booking
router.post('/', (req, res) => {
  const { bookedName, bookedDeparture, bookedDestination, bookedPrice } = req.body;

  // Create a new booking document
  const newBooking = new Booking({
    bookedName,
    bookedDeparture,
    bookedDestination,
    bookedPrice,
  });

  // Save the new booking to the database
  newBooking.save()
    .then(() => res.status(201).json({ message: 'Flight booked successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Error booking flight', details: err }));
});

module.exports = router;
