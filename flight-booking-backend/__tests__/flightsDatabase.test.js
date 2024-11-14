const request = require('supertest');
const app = require('../index'); // Adjust the path to your Express app
const { sequelize, Sequelize } = require('../localdb'); // Sequelize instance

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

describe('Flights API', () => {
  it('should add and then delete a flight successfully using raw SQL', async () => {
    // Define the mock flight data
    const newFlight = {
      name: 'Mock Flight',
      departure: 'New York',
      destination: 'Paris',
      price: 500,
    };

    // Step 1: Add the mock flight to the flights table using raw SQL
    await sequelize.query(
      'INSERT INTO "flights" ("name", "departure", "destination", "price") VALUES (:name, :departure, :destination, :price)',
      {
        replacements: newFlight,
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // Step 2: Verify the flight was added to the database using raw SQL
    const [flight] = await sequelize.query(
      'SELECT * FROM "flights" WHERE "name" = :name',
      {
        replacements: { name: newFlight.name },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    expect(flight).toBeTruthy();
    expect(flight.name).toBe(newFlight.name);
    expect(flight.departure).toBe(newFlight.departure);
    expect(flight.destination).toBe(newFlight.destination);
    expect(flight.price).toBe(newFlight.price);

    // Step 3: Delete the flight using raw SQL
    await sequelize.query(
      'DELETE FROM "flights" WHERE "name" = :name',
      {
        replacements: { name: newFlight.name },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    // Step 4: Verify the flight was deleted using raw SQL
    const [deletedFlight] = await sequelize.query(
      'SELECT * FROM "flights" WHERE "name" = :name',
      {
        replacements: { name: newFlight.name },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    expect(deletedFlight).toBeUndefined(); // It should be undefined after deletion
  });
});
