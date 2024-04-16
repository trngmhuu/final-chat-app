const express = require("express");
const {
  allMessages,
  sendMessage,
  deleteMessage
} = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);
router.route("/:messageId").delete(protect, deleteMessage);

module.exports = router;