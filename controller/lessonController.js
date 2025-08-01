const Lesson = require("../model/lesson");

// @desc Add new lesson
const createLesson = async (req, res) => {
  try {
    const { topic, explanation, example, imageUrl } = req.body;

    if (!topic || !explanation || !example) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const lesson = new Lesson({ topic, explanation, example, imageUrl });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    console.error("Error creating lesson:", err);
    res.status(500).json({ error: "Failed to create lesson" });
  }
};

// @desc Get all lesson topics
const getAllTopics = async (req, res) => {
  try {
    const lessons = await Lesson.find({}, "topic"); // only return topics
    const topics = lessons.map((lesson) => lesson.topic);
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

// @desc Get lesson by topic
const getLessonByTopic = async (req, res) => {
  try {
    const topic = req.params.topic.toLowerCase();
    const lesson = await Lesson.findOne({ topic });

    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to get lesson" });
  }
};

// @desc Update lesson by topic
const updateLesson = async (req, res) => {
  try {
    const topic = req.params.topic.toLowerCase();
    const updated = await Lesson.findOneAndUpdate({ topic }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Lesson not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson" });
  }
};

// @desc Delete lesson by topic
const deleteLesson = async (req, res) => {
  try {
    const topic = req.params.topic.toLowerCase();
    const deleted = await Lesson.findOneAndDelete({ topic });

    if (!deleted) return res.status(404).json({ error: "Lesson not found" });

    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lesson" });
  }
};

module.exports = {
  createLesson,
  getAllTopics,
  getLessonByTopic,
  updateLesson,
  deleteLesson,
};
