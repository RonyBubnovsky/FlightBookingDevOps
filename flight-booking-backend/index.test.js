// tests/flight.test.js
const request = require('supertest');
const app = require('./index'); // Adjust the path to your main app file
const mongoose = require('mongoose');


describe('Flight API', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Server is running!');
  });
});


describe('MongoDB Connection', () => {
    console.log(mongoose.connection);
  it('should be connected to MongoDB', () => {
    // Verify that MongoDB connection is responding.
    expect(mongoose.connection.readyState).toBeGreaterThanOrEqual(1);
  });

});



