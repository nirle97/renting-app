import { validToken } from "../middleware/auth";
import messageController from "../controllers/messageController";
export const message = require("express").Router();
message.get("/create-message", validToken, messageController.setNewMessage);
