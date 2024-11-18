const express = require('express');
const router = express.Router();
const { getAvailableFlights } = require('../controllers/flightController'); // Import the controller function

// Define a route to fetch available flights
router.get('/', getAvailableFlights);

module.exports = router;
