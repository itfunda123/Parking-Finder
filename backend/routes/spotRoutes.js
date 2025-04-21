const express = require('express');
const router = express.Router();
const Spot = require('../models/ParkingSpot');

// GET nearby available spots
router.get('/', async (req, res) => {
  const { lat, lng, radius = 500 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Missing lat or lng" });
  }

  const spots = await Spot.find({ isAvailable: true });

  // Filter by distance (simple approximation)
  const nearbySpots = spots.filter(spot => {
    const distance = Math.sqrt(
      Math.pow(lat - spot.location.lat, 2) +
      Math.pow(lng - spot.location.lng, 2)
    );
    return distance <= 0.01; // rough radius ~1km
  });

  res.json(nearbySpots);
});

module.exports = router;
