import User from "../../models/user.model.js";
import Question from "../../models/quizeModel/question.model.js";
import Leaderboard from "../../models/quizeModel/leader.model.js";
export const questionAdd = async (req, res) => {
  try {
    const { userId, questionText, options, correctAnswer } = req.body;
    if (!userId) {
      return res.status(400).json({
        message: "please Login first",
      });
    }
    const user = await User.findById(userId);
    if (user.role != "admin") {
      return res.status(401).json({
        message: "Invalid role",
      });
    }

    if (!questionText || !options || !correctAnswer) {
      return res.status(403).json({
        message: "Please Enter a Valid Quize Question",
      });
    }

    const newQuestion = new Question({
      userId,
      questionText,
      options,
      correctAnswer,
    });
    await newQuestion.save();
    return res.status(201).json({
      message: "Successfully uploded questions",
      questionText,
      options,
    });
  } catch (error) {
    console.error("Error saving drawing:", error);
    return res.status(500).json({
      message: "Server Error while Adding question. ",
    });
  }
};

export const viewQuize = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "Please login first",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const questions = await Question.find();

    if (!questions.length) {
      return res.status(404).json({
        message: "No quiz questions found",
      });
    }

    return res.status(200).json({
      message: "Quiz questions fetched successfully",
      questions,
    });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return res.status(500).json({
      message: "Server error while fetching quiz questions",
    });
  }
};

// submit quize
export const submitQuiz = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers || typeof answers !== "object") {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    let correctCount = 0;
    const totalQuestions = Object.keys(answers).length;

    for (let questionId of Object.keys(answers)) {
      const quiz = await Question.findById(questionId);
      if (quiz && quiz.correctAnswer === answers[questionId]) {
        correctCount++;
      }
    }

    await Leaderboard.create({
      userId,
      score: correctCount,
      total: totalQuestions,
    });

    return res.status(200).json({
      message: "Quiz submitted",
      score: correctCount,
      total: totalQuestions,
    });
  } catch (err) {
    console.error("Quiz submit error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// leader Board

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1, date: -1 }) // highest score first, then recent
      .limit(100) // optional: limit top 100
      .populate("userId", "name"); // populates name from User collection

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
};
