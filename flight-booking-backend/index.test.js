const request = require('supertest');
const app = require('./index'); // Adjust the path to your main app file
const { Client } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a PostgreSQL client instance using environment variables
const client = new Client({
  user: process.env.DB_USER,       // Use DB_USER from .env
  host: process.env.DB_HOST,       // Use DB_HOST from .env
  database: process.env.DB_NAME,   // Use DB_NAME from .env
  password: process.env.DB_PASSWORD, // Use DB_PASSWORD from .env
  port: process.env.DB_PORT,       // Use DB_PORT from .env
});

describe('Flight API', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Server is running with PostgreSQL!');
  });
});

describe('PostgreSQL Connection', () => {
  it('should connect to PostgreSQL within 10 seconds', async () => {
    // Set timeout for this specific test
    jest.setTimeout(10000); // Timeout set to 10 seconds (10000 ms)

    // Reconnect to the PostgreSQL database
    await client.connect();
    
    // Check if the connection is successful by querying the current time
    const res = await client.query('SELECT NOW()');
    
    // Ensure the query returns a valid result
    expect(res.rows.length).toBeGreaterThan(0);

    // End the connection
    await client.end();
  }, 10000); // Explicitly set the test timeout to 10 seconds
});
