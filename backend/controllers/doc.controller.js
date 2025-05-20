// controllers/doc.controller.js
import Doc from "../models/doc.model.js";

export const createDoc = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newDoc = await Doc.create({
      title,
      content,
      owner: req.user.userId,
    });

    res.status(201).json({
      success: true,
      doc: newDoc,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyDocs = async (req, res) => {
  try {
    const docs = await Doc.find({ owner: req.user.userId });
    res.status(200).json({
      success: true,
      results: docs.length,
      docs,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDoc = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Doc.findByIdAndUpdate(
      req.params.docId,
      { title, content },
      { new: true }
    );
    res.status(200).json({ success: true, doc: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
