const request = require('supertest');
const app = require('../index'); // Adjust the path to your Express app

describe('Server response', () => {
  it('should respond to GET request on /', async () => {
    const response = await request(app).get('/'); // Adjust the path if needed
    expect(response.status).toBe(200); // Expect status 200 OK
    expect(response.text).toBeDefined(); // Optionally, check for response content
  });
});
