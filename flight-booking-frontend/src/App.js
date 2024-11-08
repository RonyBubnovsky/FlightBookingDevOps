import React from 'react';
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
          <Route 
            path="/" 
            element={
              <div className="text-center py-16 pb-24">
  <div className="inline-block text-4xl font-extrabold mb-6">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-purple-600 animate-pulse tracking-wide">
      Welcome to the Flight Booking App!
    </span>
  </div>
  <div>
    <span className="text-6xl text-indigo-600">🌍</span>
  </div>
</div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
