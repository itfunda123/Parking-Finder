import React from 'react';
import parkingcity from '../src/Assets/parkingcity.jpg';
const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="display-4">About Parking Finder</h1>
        <p className="lead text-muted">Find Parking in Seconds, Not Circles.</p>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6">
          <img 
            src={parkingcity} 
            alt="Parking Finder" 
            className="img-fluid rounded shadow" 
          />
        </div>
        <div className="col-md-6">
          <h3 className="mb-3">What is Parking Finder?</h3>
          <p>
            Parking Finder is your smart companion for stress-free urban parking. Whether you're heading to work, an event, or a shopping trip, our app helps you locate available parking spots in real-time, with navigation and estimated arrival times.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">🚗 Real-time parking availability</li>
            <li className="list-group-item">🗺️ Directions to the nearest spot</li>
            <li className="list-group-item">📍 Location-based smart search</li>
            <li className="list-group-item">💬 User-contributed data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
