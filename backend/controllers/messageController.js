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

  try {
    // Tìm kiếm thông tin cuộc trò chuyện từ chatId
    const chat = await Chat.findById(chatId);

    // Lấy danh sách người nhận từ thông tin cuộc trò chuyện
    const receiverIds = chat.users;
    const senderIndex = receiverIds.indexOf(req.user._id.toString());

    // Tạo tin nhắn mới chỉ với danh sách người nhận
    var message = await Message.create({
      sender: req.user._id,
      receiver: receiverIds,
      content: content,
      chat: chatId,
    });
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    // Tìm tin nhắn theo chatId
    const messages = await Message.find({ chat: req.params.chatId });

    // Lọc tin nhắn chỉ cho những người dùng có tên trong danh sách receiver
    const filteredMessages = messages.filter(message =>
      message.receiver.includes(req.user._id.toString())
    );

    // Populate thông tin sender và chat cho tin nhắn
    const populatedMessages = await Message.populate(filteredMessages, [
      { path: "sender", select: "name pic email" },
      { path: "chat" }
    ]);

    res.json(populatedMessages);
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

    if (message.sender.toString() !== req.user._id.toString()) {
      // Lấy danh sách người nhận từ tin nhắn
      let receiverIds = message.receiver;

      // Loại bỏ id của người dùng khỏi danh sách người nhận
      const userIndex = receiverIds.indexOf(req.user._id.toString());
      if (userIndex !== -1) {
        receiverIds.splice(userIndex, 1);
      }

      // Cập nhật tin nhắn với danh sách người nhận mới
      await Message.findByIdAndUpdate(messageId, { receiver: receiverIds });
    }
    else
    {
      await Message.findByIdAndDelete(messageId);
    }

    res.json({ message: "Xóa tin nhắn thành công" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages, deleteMessage };
