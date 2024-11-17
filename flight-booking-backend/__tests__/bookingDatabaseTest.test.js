const request = require('supertest');
const app = require('../index'); // path to Express app
const { sequelize, Sequelize } = require('../localdb'); // Sequelize instance
const Booking = require('../models/Booking'); // Your Booking model


jest.setTimeout(10000); // Increase the default timeout to 10 seconds

// Set up the PostgreSQL connection to localhost
beforeAll(async () => {
  // Initialize Sequelize with connection to local Postgres
  await sequelize.authenticate(); // Test the connection
  console.log('PostgreSQL connected');
});

// Tear down the connection after the tests
afterAll(async () => {
  await sequelize.close(); // Close the connection
  console.log('PostgreSQL connection closed');
});

describe('Booking API', () => {
  it('should add and then delete a booking successfully using raw SQL', async () => {
    // Define the mock booking data
    const newBooking = {
      bookedName: 'Mock Flight',
      bookedDeparture: 'New York',
      bookedDestination: 'Paris',
      bookedPrice: 300,
    };

    // Step 1: Add the mock booking to the database using raw SQL
    await sequelize.query(
      'INSERT INTO "bookings" ("bookedName", "bookedDeparture", "bookedDestination", "bookedPrice") VALUES (:bookedName, :bookedDeparture, :bookedDestination, :bookedPrice)',
      {
        replacements: newBooking,
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // Step 2: Verify the booking was added to the database using raw SQL
    const [booking] = await sequelize.query(
      'SELECT * FROM "bookings" WHERE "bookedName" = :bookedName',
      {
        replacements: { bookedName: newBooking.bookedName },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    expect(booking).toBeTruthy();
    expect(booking.bookedName).toBe(newBooking.bookedName);
    expect(booking.bookedDeparture).toBe(newBooking.bookedDeparture);
    expect(booking.bookedDestination).toBe(newBooking.bookedDestination);
    expect(booking.bookedPrice).toBe(newBooking.bookedPrice);

    // Step 3: Delete the booking using raw SQL
    await sequelize.query(
      'DELETE FROM "bookings" WHERE "bookedName" = :bookedName',
      {
        replacements: { bookedName: newBooking.bookedName },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    // Step 4: Verify the booking was deleted using raw SQL
    const [deletedBooking] = await sequelize.query(
      'SELECT * FROM "bookings" WHERE "bookedName" = :bookedName',
      {
        replacements: { bookedName: newBooking.bookedName },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    expect(deletedBooking).toBeUndefined(); // It should be undefined after deletion
  });
});
