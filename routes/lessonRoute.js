const express = require("express");
const router = express.Router();
const {
  createLesson,
  getAllTopics,
  getLessonByTopic,
  updateLesson,
  deleteLesson,
} = require("../controller/lessonController");

// Add a lesson
router.post("/", createLesson);

// Get all lesson topics
router.get("/topics", getAllTopics);

// Get lesson by topic
router.get("/:topic", getLessonByTopic);

// Update lesson by topic
router.patch("/:topic", updateLesson);

// Delete lesson by topic
router.delete("/:topic", deleteLesson);

module.exports = router;
