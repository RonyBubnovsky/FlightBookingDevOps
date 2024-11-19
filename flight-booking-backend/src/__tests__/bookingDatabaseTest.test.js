const Booking = require('../models/Booking'); // Import the Booking model
const { sequelize, Sequelize } = require('../config/db');

jest.setTimeout(10000); // Default timeout 10 seconds

describe('Booking API', () => {
  // Sync the database before all tests
  beforeAll(async () => {
    await sequelize.sync();
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  it('should add and then delete a booking successfully using the Booking model', async () => {
    // Define the mock booking data
    const newBooking = {
      bookedName: 'Mock Flight',
      bookedDeparture: 'New York',
      bookedDestination: 'Paris',
      bookedPrice: 300,
    };

    // Step 1: Add the mock booking to the database using the Booking model
    const booking = await Booking.create(newBooking);

    // Step 2: Verify the booking was added to the database
    expect(booking).toBeTruthy();
    expect(booking.bookedName).toBe(newBooking.bookedName);
    expect(booking.bookedDeparture).toBe(newBooking.bookedDeparture);
    expect(booking.bookedDestination).toBe(newBooking.bookedDestination);
    expect(booking.bookedPrice).toBe(newBooking.bookedPrice);

    // Step 3: Delete the booking using the Booking model
    await Booking.destroy({ where: { bookedName: newBooking.bookedName } });

    // Step 4: Verify the booking was deleted
    const deletedBooking = await Booking.findOne({ where: { bookedName: newBooking.bookedName } });
    expect(deletedBooking).toBeNull(); // It should be null after deletion
  });
});
