const mongoose = require('mongoose');
const Spot = require('./models/ParkingSpot');

mongoose.connect('mongodb://localhost:27017/parkingfinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Spot.deleteMany(); // optional: clears old data

  await Spot.insertMany([
    {
      location: { lat: -1.2843, lng: 36.822 },
      description: "City Hall Parking",
      isAvailable: true,
      price: 100,
      timeLimit: "2 hours"
    },
    {
      location: { lat: -1.2857, lng: 36.8219 },
      description: "KICC Basement – Entrance on Parliament Rd",
      isAvailable: true,
      price: 150,
      timeLimit: "3 hours"
    },
    {
      location: { lat: -1.286, lng: 36.823 },
      description: "Harambee Avenue Parking",
      isAvailable: true,
      price: 50,
      timeLimit: "1 hour"
    }
  ]);

  console.log("✅ Sample parking spots inserted!");
  process.exit();
}).catch(err => {
  console.error("❌ Error seeding DB:", err);
});
