const Lesson = require("../model/lesson");

// Get lesson by topic and level
const getLessonByTopicLevel = async (req, res) => {
  try {
    const { topic, level } = req.params;
    const lesson = await Lesson.findOne({ topic, level: parseInt(level) });
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to get lesson" });
  }
};

// POST /api/lessons
const createLesson = async (req, res) => {
  try {
    console.log("Incoming lesson:", req.body);
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/lessons
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update lesson
const updateLesson = async (req, res) => {
  try {
    const { topic, level } = req.params;
    const updatedLesson = await Lesson.findOneAndUpdate(
      { topic, level: parseInt(level) },
      req.body,
      { new: true }
    );
    if (!updatedLesson) return res.status(404).json({ error: "Lesson not found" });
    res.json(updatedLesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson" });
  }
};

// Delete lesson
const deleteLesson = async (req, res) => {
  try {
    const { topic, level } = req.params;
    const deletedLesson = await Lesson.findOneAndDelete({ topic, level: parseInt(level) });
    if (!deletedLesson) return res.status(404).json({ error: "Lesson not found" });
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lesson" });
  }
};

module.exports = {
  getLessons,
  getLessonByTopicLevel,
  createLesson,
  updateLesson,
  deleteLesson,
};