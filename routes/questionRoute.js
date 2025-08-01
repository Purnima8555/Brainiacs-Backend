const express = require("express");
const router = express.Router();
const {
  createQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion,
} = require("../controller/questionController");

// Add a new question
router.post("/", createQuestion);

// Get questions by topic and level
router.get("/", getQuestions);

// Update question by ID
router.patch("/:id", updateQuestion);

// Delete question by ID
router.delete("/:id", deleteQuestion);

module.exports = router;
