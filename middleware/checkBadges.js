// middleware/checkBadges.js
const { grantBadgeToUser } = require("../services/badgeService");

async function checkBadges(req, res, next) {
  try {
    const userId = req.user.id; // assuming user ID is in req.user from auth middleware

    // Fetch user to check current status
    const user = await require("../model/User").findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Example condition: if currentLevel >= 2, grant "Starter Badge"
    if (user.currentLevel >= 2) {
      await grantBadgeToUser(userId, "Starter Badge");
    }

    // You can add more conditions here for other badges

    next();
  } catch (error) {
    console.error("Error in badge middleware:", error);
    next(); // don't block user if badge check fails, just continue
  }
}

module.exports = checkBadges;
