const { sequelize, Sequelize } = require('../config/db'); // Assuming you have sequelize setup here

// Controller function to handle fetching available flights
const getAvailableFlights = async (req, res) => {
  try {
    const { name, departure, destination, minPrice, maxPrice } = req.query; // Extract filters from the request query
    let bookedNames = [];

    // Fetch the names of all booked flights from the bookings table
    try {
      const bookedFlights = await sequelize.query(
        'SELECT DISTINCT "bookedName" FROM bookings',
        { type: Sequelize.QueryTypes.SELECT }
      );
      bookedNames = bookedFlights.map(bf => bf.bookedName);
    } catch (err) {
      console.warn('Failed to fetch booked flight names, returning all flights:', err.message);
    }

    // Construct the base SQL query, excluding booked flights if any exist
    let query = 'SELECT * FROM flights';
    const queryParams = {};

    if (bookedNames.length > 0) {
      query += ' WHERE "name" NOT IN (:bookedNames)';
      queryParams.bookedNames = bookedNames;
    }

    // Append filters to the SQL query based on query parameters
    if (name) {
      query += bookedNames.length > 0 ? ' AND' : ' WHERE';
      query += ' "name" ILIKE :name';
      queryParams.name = `%${name}%`;
    }

    if (departure) {
      query += bookedNames.length > 0 || name ? ' AND' : ' WHERE';
      query += ' "departure" ILIKE :departure';
      queryParams.departure = `%${departure}%`;
    }

    if (destination) {
      query += bookedNames.length > 0 || name || departure ? ' AND' : ' WHERE';
      query += ' "destination" ILIKE :destination';
      queryParams.destination = `%${destination}%`;
    }

    if (minPrice) {
      if (maxPrice) {
        query += bookedNames.length > 0 || name || departure || destination ? ' AND' : ' WHERE';
        query += ' "price" BETWEEN :minPrice AND :maxPrice';
        queryParams.minPrice = minPrice;
        queryParams.maxPrice = maxPrice;
      } else {
        query += bookedNames.length > 0 || name || departure || destination ? ' AND' : ' WHERE';
        query += ' "price" >= :minPrice';
        queryParams.minPrice = minPrice;
      }
    }

    // Execute the query and fetch available flights
    const availableFlights = await sequelize.query(query, {
      replacements: queryParams,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json(availableFlights); // Respond with the list of available flights
  } catch (error) {
    console.error('Error fetching available flights:', error);
    res.status(500).json({ message: 'Server error' }); // Handle errors with a 500 response
  }
};

module.exports = { getAvailableFlights }; // Export the controller function
