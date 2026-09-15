const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Destination = require("./models/Destination");
const Trip = require("./models/Trip");

async function getUser(data) {
  let user = await User.findOne({ email: data.email });
  if (!user) {
    user = await User.create({
      ...data,
      password: await bcrypt.hash(data.password, 10)
    });
  }
  return user;
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const admin = await getUser({
    name: "Travel Admin",
    email: "admin@travel.com",
    password: "Admin@123",
    role: "admin",
    location: "India"
  });

  const agent = await getUser({
    name: "Demo Agent",
    email: "agent@travel.com",
    password: "Agent@123",
    role: "agent",
    location: "Chennai"
  });

  await getUser({
    name: "Demo Traveler",
    email: "traveler@travel.com",
    password: "Traveler@123",
    role: "traveler",
    location: "Coimbatore"
  });

  const destinationData = [
    {
      name: "Ooty",
      location: "Tamil Nadu, India",
      description: "A scenic hill station known for tea gardens, lakes and cool weather.",
      category: "Mountain",
      bestTime: "October to June"
    },
    {
      name: "Goa",
      location: "Goa, India",
      description: "A popular coastal destination with beaches, heritage and vibrant culture.",
      category: "Beach",
      bestTime: "November to February"
    },
    {
      name: "Jaipur",
      location: "Rajasthan, India",
      description: "The Pink City with forts, palaces, markets and rich cultural heritage.",
      category: "Historical",
      bestTime: "October to March"
    },
    {
      name: "Wayanad",
      location: "Kerala, India",
      description: "A green destination offering forests, waterfalls, wildlife and adventure.",
      category: "Wildlife",
      bestTime: "October to May"
    }
  ];

  const destinations = [];
  for (const data of destinationData) {
    let destination = await Destination.findOne({ name: data.name });
    if (!destination) {
      destination = await Destination.create({ ...data, createdBy: admin._id });
    }
    destinations.push(destination);
  }

  const existingTrips = await Trip.countDocuments();
  if (existingTrips === 0) {
    await Trip.insertMany([
      {
        title: "Ooty Weekend Escape",
        destination: destinations[0]._id,
        description: "A relaxing weekend covering viewpoints, tea estates and local attractions.",
        startDate: new Date("2027-01-15"),
        endDate: new Date("2027-01-17"),
        price: 6500,
        availableSeats: 20,
        agent: agent._id,
        category: "Mountain"
      },
      {
        title: "Goa Beach Explorer",
        destination: destinations[1]._id,
        description: "Explore beaches, local food and heritage sites in a short community trip.",
        startDate: new Date("2027-02-10"),
        endDate: new Date("2027-02-13"),
        price: 9000,
        availableSeats: 25,
        agent: agent._id,
        category: "Beach"
      },
      {
        title: "Jaipur Heritage Trail",
        destination: destinations[2]._id,
        description: "Visit forts, palaces and cultural landmarks with a guided itinerary.",
        startDate: new Date("2027-03-05"),
        endDate: new Date("2027-03-08"),
        price: 8200,
        availableSeats: 18,
        agent: agent._id,
        category: "Historical"
      }
    ]);
  }

  console.log("Seed completed.");
  await mongoose.disconnect();
}

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
