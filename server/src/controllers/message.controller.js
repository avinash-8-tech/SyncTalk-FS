import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const showUsers = async (req, res) => {
  try {
    console.log("Logged-in user:", req.user);
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    console.log("Filtered Users:", filteredUsers);
    if (filteredUsers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    console.error("Error in showUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text || !receiverId) {
      return res
        .status(400)
        .json({ success: false, message: "Text and receiverId are required" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
    });

    await newMessage.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Message sent successfully",
        data: newMessage,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const showMessages = async (req, res) => {
  try {
    const { id: chatBro } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: chatBro },
        { senderId: chatBro, receiverId: myId },
      ],
    })
      .populate("senderId", "fullName")
      .lean();

    const formattedMessages = messages.map((msg) => ({
      ...msg,
      senderName: msg.senderId.fullName,
    }));

    res.status(200).json({ success: true, messages: formattedMessages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
