import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightsPage from './FlightsPage';
import MyBookingsPage from './MyBookingsPage';
import axios from 'axios';

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
