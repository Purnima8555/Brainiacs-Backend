const User = require("../model/User");

// Get top 10 users sorted by points descending
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ points: -1 })   // highest points first
      .limit(10)             // top 10
      .select("name avatar points badges");  // select fields to show

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

module.exports = {
  getLeaderboard,
};
