import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';

const MapComponent = ({ origin, destination, spots }) => {
  const [directions, setDirections] = useState(null);
  const [mode, setMode] = useState('DRIVING'); // Travel mode
  const [info, setInfo] = useState(null); // Duration & distance
  const [steps, setSteps] = useState([]); // Route steps
  const mapRef = useRef();

  useEffect(() => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode[mode],
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setInfo({
              distance: leg.distance.text,
              duration: leg.duration.text,
            });
            setSteps(leg.steps.map((s) => s.instructions));
          }
        }
      );
    }
  }, [origin, destination, mode]);

  return (
    <LoadScript googleMapsApiKey="b8df167a890b6549d3bf4053b5acd2f1">
      <div className="mb-3">
        <label htmlFor="modeSelect" className="form-label fw-bold">Choose travel mode:</label>
        <select
          className="form-select"
          id="modeSelect"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="DRIVING">🚗 Driving</option>
          <option value="WALKING">🚶 Walking</option>
          <option value="BICYCLING">🚴 Bicycling</option>
          <option value="TRANSIT">🚌 Transit</option>
        </select>
      </div>

      {info && (
        <div className="alert alert-info">
          <strong>Estimated Time:</strong> {info.duration} <br />
          <strong>Distance:</strong> {info.distance}
        </div>
      )}

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={origin}
        zoom={14}
        onLoad={(map) => (mapRef.current = map)}
      >
        {/* Marker for each spot */}
        {spots &&
          spots.map((spot, idx) => (
            <Marker
              key={idx}
              position={{ lat: spot.latitude, lng: spot.longitude }}
              title={spot.description}
            />
          ))}

        {/* Route */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="mt-3 text-start">
          <h5>🧭 Turn-by-turn Directions:</h5>
          <ol>
            {steps.map((step, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>
        </div>
      )}
    </LoadScript>
  );
};

export default MapComponent;
