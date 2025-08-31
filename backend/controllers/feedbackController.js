import Feedback from "../models/feedback.js";

// Submit feedback (user side)
export const submitFeedback = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const feedback = await Feedback.create({
      user: userId,
      message,
    });

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all feedbacks (admin side)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate(
      "user",
      "name email imageUrl role" // added role
    );
    res.status(200).json({ feedbacks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete a feedback
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark feedback as reviewed
export const markFeedbackReviewed = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status: "reviewed" },
      { new: true }
    );
    res.status(200).json({ message: "Feedback marked as reviewed", feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
