const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Import the Booking model

module.exports = () => {
  // POST route for creating a booking
  router.post('/', async (req, res) => {
    const { bookedName, bookedDeparture, bookedDestination, bookedPrice } = req.body;

    try {
      // Create a new booking using Sequelize ORM
      const newBooking = await Booking.create({
        bookedName,
        bookedDeparture,
        bookedDestination,
        bookedPrice
      });

      res.status(201).json({
        message: 'Flight booked successfully!',
        booking: newBooking,
      });
    } catch (err) {
      console.error('Error booking flight:', err);
      res.status(400).json({ error: 'Error booking flight', details: err });
    }
  });

  // GET route to get all bookings
  router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.findAll();
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error retrieving booked flights' });
    }
  });

  // DELETE route to cancel a booking by flight name
  router.delete('/cancel/:flightName', async (req, res) => {
    const flightName = req.params.flightName;

    try {
      const deletedBooking = await Booking.destroy({
        where: { bookedName: flightName },
      });

      if (deletedBooking === 0) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
      console.error('Error canceling the booking:', error);
      res.status(500).json({ message: 'Error canceling the booking' });
    }
  });

  return router;
};
