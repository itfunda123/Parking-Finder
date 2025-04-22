// MapComponent.js
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ origin, destination }) => {
  const [directions, setDirections] = useState(null);

  const fetchDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={process.env.b8df167a890b6549d3bf4053b5acd2f1}>
      {origin && destination && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={14}
          onLoad={() => fetchDirections(origin, destination)}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapComponent;
