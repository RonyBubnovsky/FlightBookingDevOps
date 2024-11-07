// routes/flightroutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight'); // Import the Flight model

// Endpoint for getting flights, with search functionality
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { name, departure, destination } = req.query;

    // Build a filter object based on provided query parameters
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');           // Case-insensitive regex for partial match
    if (departure) filter.departure = new RegExp(departure, 'i');
    if (destination) filter.destination = new RegExp(destination, 'i');

    // Fetch flights based on the filter
    const flights = await Flight.find(filter);
    res.status(200).json(flights); // Send flights as JSON
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Error fetching flights' });
  }
});

module.exports = router;
