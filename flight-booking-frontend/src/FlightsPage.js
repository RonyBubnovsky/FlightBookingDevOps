// src/FlightsPage.js

import React, { useState, useEffect } from 'react';
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
    // Send flight's name instead of flightId
    axios.post('http://localhost:3000/api/bookings', { flightName: flight.name })
      .then(response => {
        alert("Flight booked successfully!");
        // Remove the booked flight from the available flights list
        setFlights(flights.filter(f => f._id !== flight._id));
      })
      .catch(error => {
        alert("There was an error booking the flight.");
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Available Flights</h1>
      <ul>
        {flights.map(flight => (
          <li key={flight._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{flight.name}</h3>
                <p className="text-gray-600">{flight.departure} to {flight.destination}</p>
                <p className="text-gray-800">${flight.price}</p>
              </div>
              <button 
                onClick={() => handleBooking(flight)} 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Book Flight
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightsPage;
