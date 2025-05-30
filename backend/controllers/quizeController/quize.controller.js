import User from "../../models/user.model.js";
import Question from "../../models/quizeModel/question.model.js";

export const questionAdd = async (req, res) => {
  try {
    const { userId, questionText, options, correctAnswer, category } = req.body;
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

    if (!questionText || !options || !correctAnswer || !category) {
      return res.status(403).json({
        message: "Please Enter a Valid Quize Question",
      });
    }

    const newQuestion = new Question({
      userId,
      questionText,
      options,
      correctAnswer,
      category,
    });
    await newQuestion.save();
    return res.status(201).json({
      message: "Successfully uploded questions",
      questionText,
      options,
      category,
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

