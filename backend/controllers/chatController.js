import cloudinary from "../Lib/cloudinary.js";
import { getReceiverSocketId, io } from "../Lib/socket.js";
import Message from "../Models/messages.model.js";
import User from "../Models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const looggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: looggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// getMessages__________________________!______________

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // socket.io part here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const DeleteAllMessages = async (req, res) => {
  try {
    const result = await Message.deleteMany({}); // deletes all messages
    console.log("Deleted messages:", result);
    res
      .status(200)
      .json({ success: true, message: "All messages deleted", result });
  } catch (error) {
    console.error("Error deleting messages:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete messages" });
  }
};
