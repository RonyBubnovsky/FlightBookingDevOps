const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// Fetch available flights, excluding those that are already booked, and based on the search query
router.get('/', async (req, res) => {
  try {
    // Extract search parameters from the query string
    const { name, departure, destination, minPrice, maxPrice } = req.query;

    // Fetch all booked flight names
    const bookedFlights = await Booking.find().select('bookedName'); // Get only the flight names

    // Extract the names of the booked flights
    const bookedFlightNames = bookedFlights.map(booking => booking.bookedName);

    // Build the filter object based on the search query parameters
    const filter = { name: { $nin: bookedFlightNames } };  // Exclude booked flights

    // Apply additional filters based on search criteria if provided
    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive match for name
    if (departure) filter.departure = new RegExp(departure, 'i');  // Case-insensitive match for departure
    if (destination) filter.destination = new RegExp(destination, 'i');  // Case-insensitive match for destination

    // Apply price filters if provided
    if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) }; // Min price filter
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) }; // Max price filter

    // Find available flights that match the filter
    const availableFlights = await Flight.find(filter);

    // Send the available flights as the response
    res.json(availableFlights);
  } catch (error) {
    console.error("There was an error fetching available flights:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
