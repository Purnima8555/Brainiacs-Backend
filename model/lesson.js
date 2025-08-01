const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    enum: ["addition", "subtraction", "multiplication", "division"],
    required: true,
    unique: true, // only one lesson per topic
  },

  explanation: {
    type: String,
    required: true,
  },

  example: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String, // optional image to help kids visualize
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
