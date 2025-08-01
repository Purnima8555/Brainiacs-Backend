const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one progress record per user
  },

  progress: {
    addition: {
      completed: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
    },
    subtraction: {
      completed: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
    },
    multiplication: {
      completed: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
    },
    division: {
      completed: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
    },
  },
});

module.exports = mongoose.model("Progress", progressSchema);
