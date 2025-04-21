// App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'; // Import Footer component
import NavBar from './Navbar'; // Import Navbar component

function App() {
  const [spots, setSpots] = useState([]);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findParking = () => {
    setLoading(true);
    setError('');
    setSpots([]);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });

        console.log("📍 Current location:", lat, lng);

        try {
          const res = await axios.get(`http://localhost:5000/api/spots?lat=${lat}&lng=${lng}`);
          console.log("🧠 API Response:", res.data);
          setSpots(res.data);
          if (res.data.length === 0) {
            setError("No nearby parking spots found. Try again later or move closer to town.");
          }
        } catch (err) {
          console.error("🚨 API Error:", err);
          setError("Something went wrong while fetching spots.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("📵 Geolocation error", err);
        setError("Location permission denied or not supported.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Include Navbar here */}
      <NavBar />

      {/* Main content section */}
      <div className="container text-center py-5 flex-grow-1">
        <h1 className="mb-4">🚗 Parking Spot Finder</h1>
        <p className="lead text-muted mb-4">
          Find nearby parking in seconds – skip the hassle, save time!
        </p>
        <button className="btn btn-primary mb-4" onClick={findParking} disabled={loading}>
          {loading ? 'Searching...' : 'Find Free Parking'}
        </button>

        {error && <div className="alert alert-danger">{error}</div>}

        {spots.length > 0 && (
          <ul className="list-group">
            {spots.map((spot, index) => (
              <li key={index} className="list-group-item">
                📍 {spot.description} – {spot.price ? `Ksh ${spot.price}` : 'Free'}
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && spots.length === 0 && (
          <p className="text-muted">No spots found yet. Try clicking the button!</p>
        )}
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
