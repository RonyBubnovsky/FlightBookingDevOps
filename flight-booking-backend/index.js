const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const flightRoutes = require('./routes/flightRoutes'); // Assuming you have a route for flights

const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ronybubnovsky:dLJgXWD3YpqPDqBG@flightbooking.4cfj2.mongodb.net/flightBooking?retryWrites=true&w=majority';

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/flights', flightRoutes); // Add flight routes or any other routes you need

// Basic route
app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}


module.exports = app; // Export the app for testing purposes
