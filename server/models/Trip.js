const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    availableSeats: { type: Number, required: true, min: 1 },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Beach", "Mountain", "Adventure", "Historical", "Wildlife", "Cultural"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
