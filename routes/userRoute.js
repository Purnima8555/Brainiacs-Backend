const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser
} = require("../controller/userController");

const checkBadges = require("../middleware/checkBadges");

// Register a new user
router.post("/register", registerUser);

// Get all users
router.get("/", getAllUsers);

// Get one user by ID
router.get("/:id", getUserById);

// Update user by ID and then check badges
router.patch("/:id", updateUser, checkBadges);

module.exports = router;
