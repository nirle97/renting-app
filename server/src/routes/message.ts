import { validToken } from "../middleware/auth";
import messageController from "../controllers/messageController";
export const message = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

message.post("/create-message", messageController.setNewMessage);
message.get("/messages/:roomId",validToken, messageController.getMessagesByRoomId);
message.post("/send-file", upload.single("image"), messageController.setNewFileMessage);
message.get("/get-file/:key", messageController.getFile);
