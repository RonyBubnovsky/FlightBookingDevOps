// src/MyBookingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookingsPage = () => {
  const [bookedFlights, setBookedFlights] = useState([]);

  // Fetch booked flights when the page loads
  useEffect(() => {
    axios.get('http://localhost:3001/api/bookings') // Adjust the API endpoint if needed
      .then(response => {
        setBookedFlights(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching booked flights!', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">My Bookings</h1>

      {bookedFlights.length === 0 ? (
        <p className="text-gray-600">You have no booked flights yet.</p>
      ) : (
        <ul>
          {bookedFlights.map((booking, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{booking.bookedName}</h3>
                  <p className="text-gray-600">{booking.bookedDeparture} to {booking.bookedDestination}</p>
                  <div className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md inline-block mt-2">
                    ${booking.bookedPrice}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;
