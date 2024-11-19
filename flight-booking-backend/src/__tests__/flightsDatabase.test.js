const Flight = require('../models/Flight'); // Import the Flight model
const { sequelize, Sequelize } = require('../config/db');

jest.setTimeout(10000); // Default timeout 10 seconds

describe('Flights API', () => {
  // Sync the database before all tests
  beforeAll(async () => {
    await sequelize.sync();
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  it('should add and then delete a flight successfully using the Flight model', async () => {
    // Define the mock flight data
    const newFlight = {
      name: 'Mock Flight',
      departure: 'New York',
      destination: 'Paris',
      price: 500,
    };

    // Step 1: Add the mock flight to the database using the Flight model
    const flight = await Flight.create(newFlight);

    // Step 2: Verify the flight was added to the database
    expect(flight).toBeTruthy();
    expect(flight.name).toBe(newFlight.name);
    expect(flight.departure).toBe(newFlight.departure);
    expect(flight.destination).toBe(newFlight.destination);
    expect(flight.price).toBe(newFlight.price);

    // Step 3: Delete the flight using the Flight model
    await Flight.destroy({ where: { name: newFlight.name } });

    // Step 4: Verify the flight was deleted
    const deletedFlight = await Flight.findOne({ where: { name: newFlight.name } });
    expect(deletedFlight).toBeNull(); // It should be null after deletion
  });
});
