const Booking = require("../models/Booking");
const Trip = require("../models/Trip");
const Notification = require("../models/Notification");

exports.getAll = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "traveler") {
      filter.user = req.user.id;
    }

    if (req.user.role === "agent") {
      const trips = await Trip.find({ agent: req.user.id }).select("_id");
      filter.trip = { $in: trips.map(t => t._id) };
    }

    const bookings = await Booking.find(filter)
      .populate("user", "name email")
      .populate({
        path: "trip",
        populate: { path: "destination", select: "name location" }
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { trip: tripId, seats } = req.body;
    const requestedSeats = Number(seats);

    if (!requestedSeats || requestedSeats < 1) {
      return res.status(400).json({ message: "Seats must be at least 1" });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.availableSeats < requestedSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    trip.availableSeats -= requestedSeats;
    await trip.save();

    const booking = await Booking.create({
      user: req.user.id,
      trip: tripId,
      seats: requestedSeats,
      totalAmount: trip.price * requestedSeats
    });

    await Notification.create({
      user: req.user.id,
      message: `Booking request created for ${trip.title}.`,
      type: "booking"
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("trip");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role === "traveler" && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.user.role === "traveler" && req.body.status !== "Cancelled") {
      return res.status(403).json({ message: "Travelers can only cancel bookings" });
    }

    const oldStatus = booking.status;
    const newStatus = req.body.status;

    if (!["Pending", "Confirmed", "Cancelled"].includes(newStatus)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    booking.status = newStatus;
    await booking.save();

    if (newStatus === "Cancelled" && oldStatus !== "Cancelled") {
      booking.trip.availableSeats += booking.seats;
      await booking.trip.save();
    }

    await Notification.create({
      user: booking.user,
      message: `Your booking status is now ${newStatus}.`,
      type: "booking"
    });

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role === "traveler" && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
