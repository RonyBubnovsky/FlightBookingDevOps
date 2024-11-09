const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./index'); // Import the app from the index.js file

// MongoDB URI for testing (use a separate test DB)
const testDbURI = 'mongodb+srv://ronybubnovsky:dLJgXWD3YpqPDqBG@flightbooking.4cfj2.mongodb.net/testFlightBooking?retryWrites=true&w=majority';

beforeAll(async () => {
  // Close any existing database connections before starting the tests
  await mongoose.disconnect();

  // Connect to the test database before running any tests
  await mongoose.connect(testDbURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Disconnect all mongoose connections after all tests are done
  await mongoose.connection.close();
  console.log('Disconnected from the test database.');
});

describe('Server and Database Tests', () => {

  // Test if the server is responding
  it('should respond with 200 for GET requests to /api/flights', async () => {
    const response = await request(app).get('/api/flights');
    expect(response.status).toBe(200);
  });

  // Test if the database is connected
  it('should connect to the test database', async () => {
    const dbState = mongoose.connection.readyState;
    expect(dbState).toBe(1); // 1 means connected
  });

  // Test if the server responds on the root URL
  it('should respond with 200 for GET requests to the root', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

});
