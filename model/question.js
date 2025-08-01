const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    enum: ["addition", "subtraction", "multiplication", "division"],
    required: true,
  },

  level: {
    type: Number,
    required: true,
  },

  questionText: {
    type: String,
    required: true,
  },

  options: {
    type: [String], // Only for MCQ
    default: [],
  },

  correctAnswer: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["mcq", "short"],
    default: "short",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
