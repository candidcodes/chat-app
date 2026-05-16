const Message = require("../models/Message");

// GET /api/chat/history
const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getChatHistory };
