const express = require("express");
const router = express.Router();
const {
  getLessons,
  getLessonByTopicLevel,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controller/lessonController");

// Get all lessons
router.get("/", getLessons);

// Get lesson by topic and level
router.get("/:topic/:level", getLessonByTopicLevel);

// Create lesson
router.post("/", createLesson);

// Update lesson
router.patch("/:topic/:level", updateLesson);

// Delete lesson
router.delete("/:topic/:level", deleteLesson);

module.exports = router;