// controllers/doc.controller.js
import Doc from "../models/doc.model.js";

export const createDoc = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Count only user's docs where title starts with "Untitled"
    const untitledDocs = await Doc.find({
      owner: userId,
      title: { $regex: /^Untitled \d+$/ },
    });

    // Extract the highest existing number to increment correctly
    const numbers = untitledDocs
      .map((doc) => parseInt(doc.title.replace("Untitled ", "")))
      .filter((n) => !isNaN(n));

    const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    const title = `Untitled ${nextNumber}`;

    const newDoc = await Doc.create({
      title,
      content: "",
      owner: userId,
    });

    res.status(201).json({
      success: true,
      doc: newDoc,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyDocs = async (req, res) => {
  try {
    const docs = await Doc.find({ owner: req.user.userId }).sort({
      updatedAt: -1,
    });

    const docsWithPreview = docs.map((doc) => {
      return {
        ...doc._doc,
        preview: doc.content
          ? doc.content.substring(0, 100) +
            (doc.content.length > 100 ? "..." : "")
          : "No content preview available.",
      };
    });

    res.status(200).json({
      success: true,
      results: docs.length,
      docs: docsWithPreview,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDocById = async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.docId);

    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    if (doc.owner.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const preview = doc.content
      ? doc.content.substring(0, 100) + (doc.content.length > 100 ? "..." : "")
      : "No content preview available.";

    res.status(200).json({
      success: true,
      doc: { ...doc._doc, preview },
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDoc = async (req, res) => {
  try {
    const { title, content } = req.body;

    const doc = await Doc.findById(req.params.docId);
    if (!doc)
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });

    if (doc.owner.toString() !== req.user.userId)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    doc.title = title;
    doc.content = content;
    await doc.save();

    res.status(200).json({ success: true, doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
