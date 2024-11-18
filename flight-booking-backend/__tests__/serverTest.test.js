const request = require('supertest');

// Test the server's response to a GET request on the root path
describe('Server response', () => {
  it('should respond to GET request on /', async () => {
    const response = await request('http://localhost:3001').get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeDefined();
  });
});
