const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  progress: {
    addition: [{
      level: { type: Number, required: true },
      accuracy: { type: Number, required: true, min: 0, max: 100 },
      score: { type: Number, required: true, min: 0 }, // Added score field
    }],
    subtraction: [{
      level: { type: Number, required: true },
      accuracy: { type: Number, required: true, min: 0, max: 100 },
      score: { type: Number, required: true, min: 0 },
    }],
    multiplication: [{
      level: { type: Number, required: true },
      accuracy: { type: Number, required: true, min: 0, max: 100 },
      score: { type: Number, required: true, min: 0 },
    }],
    division: [{
      level: { type: Number, required: true },
      accuracy: { type: Number, required: true, min: 0, max: 100 },
      score: { type: Number, required: true, min: 0 },
    }],
  },
});

module.exports = mongoose.model("Progress", progressSchema);