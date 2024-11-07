// routes/flightRoutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// Fetch available flights, excluding those that are already booked
router.get('/', async (req, res) => {
  try {
    // Fetch all booked flight names
    const bookedFlights = await Booking.find().select('bookedName'); // Get only the flight names

    // Extract the names of the booked flights
    const bookedFlightNames = bookedFlights.map(booking => booking.bookedName);

    // Find all available flights (exclude those that are booked)
    const availableFlights = await Flight.find({
      name: { $nin: bookedFlightNames }  // Exclude flights already booked
    });

    res.json(availableFlights);
  } catch (error) {
    console.error("There was an error fetching available flights:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
