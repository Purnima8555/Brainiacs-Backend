const Progress = require("../model/progress");

// Get progress by user ID
const getProgressByUserId = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json(progress.progress);
  } catch (err) {
    res.status(500).json({ error: "Failed to get progress" });
  }
};

// Create progress for a user (optional, can create on registration)
const createProgress = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const existing = await Progress.findOne({ userId });
    if (existing) return res.status(400).json({ error: "Progress already exists" });

    const newProgress = new Progress({ userId });
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (err) {
    res.status(500).json({ error: "Failed to create progress" });
  }
};

// Update progress for a user
const updateProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { topic, completed, correct } = req.body;

    if (!topic || completed == null || correct == null) {
      return res.status(400).json({ error: "topic, completed, and correct are required" });
    }

    const progress = await Progress.findOne({ userId });
    if (!progress) return res.status(404).json({ error: "Progress not found" });

    if (progress.progress[topic]) {
      progress.progress[topic].completed += completed;
      progress.progress[topic].correct += correct;
    } else {
      return res.status(400).json({ error: "Invalid topic" });
    }

    await progress.save();
    res.json({ message: "Progress updated", progress: progress.progress });
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// Delete progress record (optional)
const deleteProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await Progress.findOneAndDelete({ userId });
    if (!deleted) return res.status(404).json({ error: "Progress not found" });
    res.json({ message: "Progress deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete progress" });
  }
};

module.exports = {
  getProgressByUserId,
  createProgress,
  updateProgress,
  deleteProgress,
};
