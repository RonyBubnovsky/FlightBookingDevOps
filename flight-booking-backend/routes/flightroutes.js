const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Flight = require('../models/Flight'); // Import the Flight model
const Booking = require('../models/Booking'); // Import the Booking model

module.exports = () => {
  // Fetch available flights, excluding those that are already booked
  router.get('/', async (req, res) => {
    try {
      // Extract search parameters from the query string
      const { name, departure, destination, minPrice, maxPrice } = req.query;

      // Step 1: Get all booked flight names
      const bookedFlights = await Booking.findAll({ attributes: ['bookedName'] });
      const bookedFlightNames = bookedFlights.map(booking => booking.bookedName);

      // Step 2: Build query with filters
      let queryOptions = {
        where: {
          name: {
            [Op.notIn]: bookedFlightNames,
            [Op.iLike]: `%${name || ''}%`,
          },
          departure: {
            [Op.iLike]: `%${departure || ''}%`,
          },
          destination: {
            [Op.iLike]: `%${destination || ''}%`,
          },
          price: maxPrice ? {
            [Op.between]: [minPrice || 0, maxPrice],  // If maxPrice is provided, use the range
          } : {
            [Op.gte]: minPrice || 0,  // If maxPrice is not provided, filter by minPrice only
          },
        },
      };
      

      // Step 3: Execute the query
      const availableFlights = await Flight.findAll(queryOptions);

      // Step 4: Send available flights as the response
      res.json(availableFlights);
    } catch (error) {
      console.error("Error fetching available flights:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};
