// routes/flightroutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight'); // Import the Flight model

// Endpoint for getting flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find(); // Fetch flights from the database
    res.status(200).json(flights);       // Send flights as JSON
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Error fetching flights' });
  }
});

module.exports = router;
