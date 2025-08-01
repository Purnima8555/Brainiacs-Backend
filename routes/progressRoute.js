const express = require("express");
const router = express.Router();
const {
  getProgressByUserId,
  createProgress,
  updateProgress,
  deleteProgress,
} = require("../controller/progressController");

// Create progress record
router.post("/", createProgress);

// Get progress by user ID
router.get("/:userId", getProgressByUserId);

// Update progress for user
router.patch("/:userId", updateProgress);

// Delete progress record (optional)
router.delete("/:userId", deleteProgress);

module.exports = router;
