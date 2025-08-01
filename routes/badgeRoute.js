const express = require("express");
const router = express.Router();
const {
  createBadge,
  getAllBadges,
  grantBadgeToUser,
  deleteBadge,
} = require("../controller/badgeController");

// Create a badge
router.post("/", createBadge);

// Get all badges
router.get("/", getAllBadges);

// Grant a badge to a user
router.patch("/users/:id", grantBadgeToUser);

// Delete a badge by name
router.delete("/:name", deleteBadge);

module.exports = router;