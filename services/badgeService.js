// services/badgeService.js
const Badge = require("../model/badge");
const User = require("../model/User");

async function grantBadgeToUser(userId, badgeName) {
  const badge = await Badge.findOne({ name: badgeName });
  if (!badge) throw new Error("Badge not found");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Check if user already has the badge
  if (user.badges.some(b => b.toString() === badge._id.toString())) {
    return false; // badge already granted
  }

  // Add badge to user's badges array
  user.badges.push(badge._id);
  await user.save();
  return true; // badge successfully granted
}

module.exports = { grantBadgeToUser };
