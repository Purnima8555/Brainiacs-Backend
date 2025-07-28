const mongoose = require("mongoose");

const practiceQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: Number,
  type: String
});

const lessonSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  level: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  conceptData: {
    a: Number,
    b: Number,
    total: Number,
    emoji: String,
    name: String,
    desc: String
  },
  practiceQuestions: [practiceQuestionSchema],
  challengeSeconds: Number
});

lessonSchema.index({ topic: 1, level: 1 }, { unique: true });

module.exports = mongoose.model("Lesson", lessonSchema);
