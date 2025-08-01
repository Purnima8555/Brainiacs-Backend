const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "21e6fb393716f568bf5ab155f62379812ac5b048efdea976aa1b1699f9e7e7dd";

// Existing functions
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Create admin
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(403).send("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    // Include userId in the response
    res.json({
      token,
      email: admin.email,
      role: admin.role,
      userId: admin._id
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// New function to get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // Exclude password field
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};

// New function to get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    console.error("Error fetching admin:", err);
    res.status(500).json({ error: "Failed to fetch admin" });
  }
};