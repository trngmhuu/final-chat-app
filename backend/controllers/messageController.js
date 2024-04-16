const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;

  try {
    // Kiểm tra xem tin nhắn tồn tại không
    const message = await Message.findById(messageId);
    if (!message) {
      res.status(404);
      throw new Error("Không tìm thấy tin nhắn");
    }

    // Kiểm tra xem người dùng có quyền xóa tin nhắn không
    if (message.sender.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Bạn không có quyền xóa tin nhắn này");
    }

    // Xóa tin nhắn
    await Message.findByIdAndDelete(messageId);

    res.json({ message: "Xóa tin nhắn thành công" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages, deleteMessage }