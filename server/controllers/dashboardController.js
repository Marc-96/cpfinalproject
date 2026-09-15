const User = require("../models/User");
const Trip = require("../models/Trip");
const Destination = require("../models/Destination");
const Booking = require("../models/Booking");
const TripPlanning = require("../models/TripPlanning");

exports.getDashboard = async (req, res) => {
  try {
    const common = {
      destinations: await Destination.countDocuments(),
      trips: await Trip.countDocuments(),
      users: await User.countDocuments(),
      bookings: await Booking.countDocuments()
    };

    if (req.user.role === "traveler") {
      common.myBookings = await Booking.countDocuments({ user: req.user.id });
      common.myPlans = await TripPlanning.countDocuments({ user: req.user.id });
    }

    if (req.user.role === "agent") {
      const myTrips = await Trip.countDocuments({ agent: req.user.id });
      const tripIds = await Trip.find({ agent: req.user.id }).select("_id");
      const myBookings = await Booking.countDocuments({ trip: { $in: tripIds.map(t => t._id) } });
      common.myTrips = myTrips;
      common.myBookings = myBookings;
    }

    res.json(common);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
