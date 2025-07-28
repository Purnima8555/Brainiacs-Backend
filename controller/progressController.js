const mongoose = require("mongoose");
const Progress = require("../model/progress");
// const User = require("../model/user"); // Uncomment if you have a User model

// Get progress by user ID
const getProgressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    const progress = await Progress.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json(progress.progress);
  } catch (err) {
    console.error("Get progress error:", err.message);
    res.status(500).json({ error: "Failed to get progress" });
  }
};

// Create progress for a user
const createProgress = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    // Optional: Check if User exists (uncomment if you have a User model)
    /*
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });
    */

    const existing = await Progress.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (existing) return res.status(400).json({ error: "Progress already exists" });

    const newProgress = new Progress({
      userId: new mongoose.Types.ObjectId(userId),
      progress: {
        addition: [],
        subtraction: [],
        multiplication: [],
        division: [],
      },
    });
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (err) {
    console.error("Create progress error:", err.message);
    res.status(500).json({ error: "Failed to create progress" });
  }
};

// Update progress for a user
const updateProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { topic, level, accuracy, score } = req.body;

    if (!topic || level == null || accuracy == null || score == null) {
      return res.status(400).json({ error: "topic, level, accuracy, and score are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const validTopics = ["addition", "subtraction", "multiplication", "division"];
    if (!validTopics.includes(topic.toLowerCase())) {
      return res.status(400).json({ error: "Invalid topic" });
    }

    const progress = await Progress.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!progress) return res.status(404).json({ error: "Progress not found" });

    const topicKey = topic.toLowerCase();
    const existingLevel = progress.progress[topicKey].find((entry) => entry.level === level);

    if (existingLevel) {
      existingLevel.accuracy = Math.max(existingLevel.accuracy, accuracy);
      existingLevel.score = Math.max(existingLevel.score, score);
    } else {
      progress.progress[topicKey].push({ level, accuracy, score });
    }

    await progress.save();
    res.json({ message: "Progress updated", progress: progress.progress });
  } catch (err) {
    console.error("Update progress error:", err.message);
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// Delete progress record
const deleteProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const deleted = await Progress.findOneAndDelete({ userId: new mongoose.Types.ObjectId(userId) });
    if (!deleted) return res.status(404).json({ error: "Progress not found" });
    res.json({ message: "Progress deleted successfully" });
  } catch (err) {
    console.error("Delete progress error:", err.message);
    res.status(500).json({ error: "Failed to delete progress" });
  }
};

module.exports = {
  getProgressByUserId,
  createProgress,
  updateProgress,
  deleteProgress,
};