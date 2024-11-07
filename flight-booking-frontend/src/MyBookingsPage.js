// src/MyBookingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookingsPage = () => {
  const [bookedFlights, setBookedFlights] = useState([]);

  // Fetch booked flights from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/bookings')
      .then(response => setBookedFlights(response.data))
      .catch(error => console.error("There was an error fetching bookings!", error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">My Booked Flights</h1>
      <div>
        {bookedFlights.length > 0 ? (
          bookedFlights.map(flight => (
            <div key={flight._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-semibold">{flight.flightId.name}</h3>
              <p className="text-gray-600">{flight.flightId.departure} to {flight.flightId.destination}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
