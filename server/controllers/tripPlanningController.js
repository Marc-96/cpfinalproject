const TripPlanning = require("../models/TripPlanning");

exports.getAll = async (req, res) => {
  try {
    const plans = await TripPlanning.find({ user: req.user.id })
      .populate("destination", "name location category")
      .sort({ startDate: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const plan = await TripPlanning.findOne({ _id: req.params.id, user: req.user.id })
      .populate("destination");
    if (!plan) return res.status(404).json({ message: "Trip plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const plan = await TripPlanning.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const plan = await TripPlanning.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!plan) return res.status(404).json({ message: "Trip plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const plan = await TripPlanning.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!plan) return res.status(404).json({ message: "Trip plan not found" });
    res.json({ message: "Trip plan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
