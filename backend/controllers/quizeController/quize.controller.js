import User from "../../models/user.model.js";
import Question from "../../models/quizeModel/question.model.js";
import Leaderboard from "../../models/quizeModel/leader.model.js";
import fs from "fs";
import { uploadMedia, deleteMedia } from "../../utils/cloudinary.js";
import { parseCsvFile } from "../../utils/parseCsvFile.js"; // function that parses CSV into questions array

// --------------------- ADD QUIZ QUESTIONS FROM CSV ---------------------
export const questionAdd = async (req, res) => {
  try {
    const userId = req.user.userId; // logged-in user
    const { title } = req.body;
    if (!userId) return res.status(400).json({ message: "Please login first" });

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized: Admin only" });
    }
    if (!title) {
      return res.status(400).json({ message: "Quiz title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    // Upload file to cloud (optional)
    const result = await uploadMedia(req.file.path);

    // Parse CSV into questions array
    const questions = await parseCsvFile(req.file.path);
    fs.unlinkSync(req.file.path); // remove local file

    if (!questions.length) {
      return res
        .status(400)
        .json({ message: "No valid questions found in CSV" });
    }

    // Create Question document
    const newQuiz = await Question.create({
      userId,
      title,
      csvFileUrl: result.url,
      csvFileName: req.file.originalname,
      csvFilePublicId: result.public_id,
      questions, // array of parsed questions from CSV
    });

    return res.status(201).json({
      message: "Quiz uploaded successfully from CSV",
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("Error adding quiz from CSV:", error);
    return res.status(500).json({ message: "Server error while adding quiz" });
  }
};

// --------------------- VIEW QUIZ QUESTIONS ---------------------
export const viewQuize = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) return res.status(400).json({ message: "Please login first" });

    const quizzes = await Question.find();
    if (!quizzes.length)
      return res.status(404).json({ message: "No quizzes found" });

    return res.status(200).json({
      message: "Quizzes fetched successfully",
      quizzes,
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching quizzes" });
  }
};

// --------------------- SUBMIT QUIZ ---------------------

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // { subQuestionId: "A"/"B"/"C"/"D" }
    const userId = req.user.userId;

    if (!userId || !answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ message: "No answers submitted" });
    }

    let correctCount = 0;
    const subQuestionIds = Object.keys(answers);

    for (let subQId of subQuestionIds) {
      const quiz = await Question.findOne({ "questions._id": subQId });
      if (!quiz) continue;

      const question = quiz.questions.id(subQId);
      if (!question) continue;

      if (question.answer.toUpperCase() === answers[subQId].toUpperCase()) {
        correctCount++;
      }
    }

    // Save leaderboard entry
    const leaderboardEntry = await Leaderboard.create({
      userId,
      score: correctCount,
      total: subQuestionIds.length,
    });

    return res.status(200).json({
      message: "Quiz submitted successfully",
      score: correctCount,
      total: subQuestionIds.length,
      entry: leaderboardEntry,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return res
      .status(500)
      .json({ message: "Server error while submitting quiz" });
  }
};

// --------------------- LEADERBOARD ---------------------
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1, createdAt: -1 })
      .limit(100)
      .populate("userId", "name");

    return res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
