const Badge = require("../model/badge");
const User = require("../model/User");

// Create a badge
const createBadge = async (req, res) => {
  try {
    const { name, emoji, description, unlocked } = req.body;
    if (!name || !emoji) {
      return res.status(400).json({ error: "Name and emoji are required" });
    }

    const existing = await Badge.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Badge already exists" });
    }

    const badge = new Badge({ name, emoji, description, unlocked });
    await badge.save();

    res.status(201).json(badge);
  } catch (err) {
    res.status(500).json({ error: "Failed to create badge" });
  }
};

// Get all badges
const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: "Failed to get badges" });
  }
};

// Grant a badge to a user
const grantBadgeToUser = async (req, res) => {
  try {
    const { id } = req.params; // user id
    const { badgeName } = req.body;

    if (!badgeName) return res.status(400).json({ error: "badgeName is required" });

    const badge = await Badge.findOne({ name: badgeName });
    if (!badge) return res.status(404).json({ error: "Badge not found" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.badges.includes(badgeName)) {
      return res.status(400).json({ error: "User already has this badge" });
    }

    user.badges.push(badgeName);
    badge.unlocked = true; // Set badge as unlocked when granted
    await user.save();
    await badge.save();

    res.json({ message: `Badge '${badgeName}' granted to user.`, badges: user.badges });
  } catch (err) {
    res.status(500).json({ error: "Failed to grant badge" });
  }
};

// Delete badge by name
const deleteBadge = async (req, res) => {
  try {
    const { name } = req.params;

    const badge = await Badge.findOneAndDelete({ name });
    if (!badge) return res.status(404).json({ error: "Badge not found" });

    // Remove this badge from all users
    await User.updateMany(
      { badges: name },
      { $pull: { badges: name } }
    );

    res.json({ message: "Badge deleted and removed from all users" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete badge" });
  }
};

module.exports = {
  createBadge,
  getAllBadges,
  grantBadgeToUser,
  deleteBadge,
};