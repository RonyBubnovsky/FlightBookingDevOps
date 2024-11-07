import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);

  // Fetch available flights from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error("There was an error fetching flights!", error));
  }, []);

  const handleBooking = (flight) => {
    axios.post('http://localhost:3000/api/bookings', { flightId: flight._id })
      .then(response => {
        alert("Flight booked successfully!");
      })
      .catch(error => {
        alert("There was an error booking the flight.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Available Flights</h1>
      <ul className="space-y-4">
        {flights.map(flight => (
          <li key={flight._id} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{flight.name}</h3>
              <p className="text-gray-600">{flight.departure} to {flight.destination}</p>
              <p className="text-lg font-semibold text-green-500">${flight.price}</p>
            </div>
            <button 
              onClick={() => handleBooking(flight)} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MyBookingsPage = () => {
  const [bookedFlights, setBookedFlights] = useState([]);

  // Fetch booked flights from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/bookings')
      .then(response => setBookedFlights(response.data))
      .catch(error => console.error("There was an error fetching bookings!", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Booked Flights</h1>
      <div>
        {bookedFlights.length > 0 ? (
          bookedFlights.map(flight => (
            <div key={flight._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{flight.flightId.name}</h3>
              <p className="text-gray-600">{flight.flightId.departure} to {flight.flightId.destination}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="bg-blue-600 p-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link to="/flights" className="text-white text-xl font-semibold hover:text-blue-200">Available Flights</Link>
            </li>
            <li>
              <Link to="/my-bookings" className="text-white text-xl font-semibold hover:text-blue-200">My Bookings</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/" element={<h2 className="text-center text-3xl text-blue-600 mt-10">Welcome to the Flight Booking App!</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
