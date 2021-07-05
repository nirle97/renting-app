import { validToken } from "../middleware/auth";
import messageController from "../controllers/messageController";
export const message = require("express").Router();
message.post("/create-message", messageController.setNewMessage);
message.get("/messages/:roomId",validToken, messageController.getMessagesByRoomId);
