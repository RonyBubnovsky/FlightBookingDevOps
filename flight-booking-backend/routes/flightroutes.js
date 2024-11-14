const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../db'); // Assuming you have sequelize setup here

module.exports = () => {
  // Fetch available flights, excluding those that are already booked
  router.get('/', async (req, res) => {
    try {
      // Extract search parameters from the query string
      const { name, departure, destination, minPrice, maxPrice } = req.query;

      let bookedNames = [];
      
      // Step 1: Attempt to get all booked flight names
      try {
        const bookedFlights = await sequelize.query(
          'SELECT DISTINCT bookedName FROM bookings',
          { type: Sequelize.QueryTypes.SELECT }
        );
        bookedNames = bookedFlights.map(bf => bf.bookedName);
      } catch (err) {
        console.warn('Could not fetch booked names, returning all flights:', err.message);
      }

      // Step 2: Build the base SQL query to exclude booked flights if `bookedNames` are found
      let query = 'SELECT * FROM flights';
      const queryParams = {};

      if (bookedNames.length > 0) {
        query += ' WHERE name NOT IN (:bookedNames)';
        queryParams.bookedNames = bookedNames;
      }

      // Step 3: Add additional filters based on query parameters
      if (name) {
        query += bookedNames.length > 0 ? ' AND' : ' WHERE';
        query += ' name LIKE :name';
        queryParams.name = `%${name}%`;
      }

      if (departure) {
        query += bookedNames.length > 0 || name ? ' AND' : ' WHERE';
        query += ' departure LIKE :departure';
        queryParams.departure = `%${departure}%`;
      }

      if (destination) {
        query += bookedNames.length > 0 || name || departure ? ' AND' : ' WHERE';
        query += ' destination LIKE :destination';
        queryParams.destination = `%${destination}%`;
      }

      if (minPrice) {
        if (maxPrice) {
          query += bookedNames.length > 0 || name || departure || destination ? ' AND' : ' WHERE';
          query += ' price BETWEEN :minPrice AND :maxPrice';
          queryParams.minPrice = minPrice;
          queryParams.maxPrice = maxPrice;
        } else {
          query += bookedNames.length > 0 || name || departure || destination ? ' AND' : ' WHERE';
          query += ' price >= :minPrice';
          queryParams.minPrice = minPrice;
        }
      }

      // Step 4: Execute the query with Sequelize
      const availableFlights = await sequelize.query(query, {
        replacements: queryParams,
        type: Sequelize.QueryTypes.SELECT,
      });

      // Step 5: Send available flights as the response
      res.json(availableFlights);
    } catch (error) {
      console.error('Error fetching available flights:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};
