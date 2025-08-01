const Question = require("../model/question");

// @desc    Add a new question (admin only)
// @route   POST /api/questions
const createQuestion = async (req, res) => {
  try {
    const { topic, level, questionText, options, correctAnswer, type } = req.body;

    if (!topic || !level || !questionText || !correctAnswer || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const question = new Question({
      topic,
      level,
      questionText,
      options: type === "mcq" ? options : [],
      correctAnswer,
      type,
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Failed to create question" });
  }
};

// @desc    Get questions by topic and level
// @route   GET /api/questions?topic=addition&level=1
const getQuestions = async (req, res) => {
  try {
    const { topic, level } = req.query;

    let filter = {};
    if (topic) filter.topic = topic;
    if (level) filter.level = level;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get questions" });
  }
};

// @desc    Update a question by ID
// @route   PATCH /api/questions/:id
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Failed to update question" });
  }
};

// @desc    Delete a question by ID
// @route   DELETE /api/questions/:id
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Failed to delete question" });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
};
