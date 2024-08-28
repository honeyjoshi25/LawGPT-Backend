const Router = require("express");
const router = Router();
const chatController = require("../../controller/chathistory/chathistory");

router.post("/add-chatHistory", chatController.addChatHistory);
router.get("/get-allChatHistory", chatController.getAllChatHistory);
router.get("/get-chatHistoryById", chatController.getChatHistoryById);
router.put("/update-chathistory", chatController.updateChatHistory);
router.delete("/delete-chathistory", chatController.deleteChatHistory);

module.exports = router;
