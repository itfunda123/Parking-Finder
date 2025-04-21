const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number
  },
  description: String,
  isAvailable: Boolean,
  price: Number,
  timeLimit: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
