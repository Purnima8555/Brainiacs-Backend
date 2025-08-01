const mongoose = require("mongoose");

const avatarOptions = [
  "RocketRam",
  "BrainyBelle",
  "TwinTales",
  "RoaryRoy",
  "HarmonyHope",
  "ClimberCody",
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  avatar: {
    type: String,
    enum: avatarOptions,
    required: true,
  },

  currentLevel: {
    type: Number,
    default: 1,
  },

  points: {
    type: Number,
    default: 0,
  },

  // Array of Badge IDs
  badges: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Badge" }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
