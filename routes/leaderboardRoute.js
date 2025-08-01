const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controller/leaderboardController");

// GET top 10 leaderboard
router.get("/", getLeaderboard);

module.exports = router;
