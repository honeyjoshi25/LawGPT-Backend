const { ChatHistory } = require("../../db/models/chathistory");

const addChatHistory = async (req, res, next) => {
  try {
    const { user_id, session_id, conversation_history } = req.body;

    const newChat = await ChatHistory.create({
      user_id,
      session_id,
      conversation_history,
    });

    if (!newChat) {
      return res
        .status(400)
        .json({ status: 400, message: "Failed to store chat!" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Chat has been stored succesfully." });
  } catch (error) {
    console.error("Error in add chathistory:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const getAllChatHistory = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error in get all chathistory:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const getChatHistoryById = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error in get chathistory by id:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const updateChatHistory = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error in update chathistory:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const deleteChatHistory = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error in delete chathistory:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

module.exports = {
  addChatHistory,
  getAllChatHistory,
  getChatHistoryById,
  updateChatHistory,
  deleteChatHistory,
};
