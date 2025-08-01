const express = require("express");
const { registerAdmin, loginAdmin, getAllAdmins, getAdminById } = require("../controller/adminController");
const router = express.Router();

// Register (only do this once or keep route protected)
router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);

// Get all admins
router.get("/", getAllAdmins);

// Get admin by ID
router.get("/:id", getAdminById);

module.exports = router;