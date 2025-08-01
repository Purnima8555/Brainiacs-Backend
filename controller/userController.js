const User = require("../model/User");

// @desc    Register new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, age, avatar, isGuest = false } = req.body;

    if (!name || !age || !avatar) {
      return res.status(400).json({ error: "Name, age, and avatar are required" });
    }

    const newUser = new User({ name, age, avatar, isGuest });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Get all users with badges populated
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('badges');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

// Get single user with badges populated
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('badges');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
};


// @desc    Update user by ID
// @route   PATCH /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser
};