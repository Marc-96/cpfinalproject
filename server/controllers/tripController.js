const Trip = require("../models/Trip");

exports.getAll = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("destination", "name location category")
      .populate("agent", "name email")
      .sort({ startDate: 1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("destination")
      .populate("agent", "name email");
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const trip = await Trip.create({
      ...req.body,
      agent: req.user.id
    });
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (req.user.role !== "admin" && trip.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can update only your trips" });
    }

    Object.assign(trip, req.body);
    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (req.user.role !== "admin" && trip.agent.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your trips" });
    }

    await trip.deleteOne();
    res.json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
