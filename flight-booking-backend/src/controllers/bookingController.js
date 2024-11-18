const { sequelize, Sequelize } = require('../config/db'); // Sequelize setup

// Controller function to create a booking
const createBooking = async (req, res) => {
  const { bookedName, bookedDeparture, bookedDestination, bookedPrice } = req.body;

  try {
    // Insert a new booking using raw SQL query
    const result = await sequelize.query(
      `INSERT INTO bookings ("bookedName", "bookedDeparture", "bookedDestination", "bookedPrice")
       VALUES (:bookedName, :bookedDeparture, :bookedDestination, :bookedPrice) RETURNING *`,
      {
        replacements: {
          bookedName,
          bookedDeparture,
          bookedDestination,
          bookedPrice,
        },
        type: Sequelize.QueryTypes.INSERT
      }
    );

    const newBooking = result[0][0]; // Since we're using `RETURNING *`, the inserted booking is returned
    res.status(201).json({
      message: 'Flight booked successfully!',
      booking: newBooking,
    });
  } catch (err) {
    console.error('Error booking flight:', err);
    res.status(400).json({ error: 'Error booking flight', details: err });
  }
};

// Controller function to get all bookings
const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings using a raw SQL query
    const bookings = await sequelize.query(
      'SELECT "id", "bookedName", "bookedDeparture", "bookedDestination", "bookedPrice" FROM bookings',
      { type: Sequelize.QueryTypes.SELECT }
    );
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error retrieving booked flights' });
  }
};

// Controller function to cancel a booking by flight name
const cancelBooking = async (req, res) => {
  const flightName = req.params.flightName;

  try {
    // Delete booking by flight name using raw SQL query
    const result = await sequelize.query(
      'DELETE FROM bookings WHERE "bookedName" = :flightName RETURNING *',
      {
        replacements: { flightName },
        type: Sequelize.QueryTypes.DELETE
      }
    );

    // If no rows are affected, the booking does not exist
    if (result[0].length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling the booking:', error);
    res.status(500).json({ message: 'Error canceling the booking' });
  }
};

module.exports = { createBooking, getAllBookings, cancelBooking }; // Export controller functions
