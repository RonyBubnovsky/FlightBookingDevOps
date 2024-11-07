// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// POST request to create a new booking and remove the flight from available flights
router.post('/', async (req, res) => {
  const { flightName } = req.body;

  try {
    // Find the flight by its name
    const flight = await Flight.findOne({ name: flightName });
    
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    // Create a new booking
    const newBooking = new Booking({
      flightName: flight.name,
      departure: flight.departure,
      destination: flight.destination,
      price: flight.price,
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Remove the flight from available flights (since it's booked)
    await Flight.findOneAndDelete({ name: flightName });

    // Return the booking response
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Error creating booking', message: error.message });
  }
});

// GET request to fetch all bookings (using flightName instead of flightId)
router.get('/', async (req, res) => {
  try {
    // Fetch all bookings from the database
    const bookings = await Booking.find();

    // Map over each booking and populate the flight details based on flightName
    const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
      const flight = await Flight.findOne({ name: booking.flightName });
      return {
        ...booking.toObject(),
        flight, // Add flight details to booking object
      };
    }));

    res.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings', message: error.message });
  }
});

module.exports = router;
