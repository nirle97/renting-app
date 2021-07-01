import { validToken } from "../middleware/auth";
export const chat = require("express").Router();
import chatController from "../controllers/chatController";

chat.post("/tokenValidate", validToken, chatController.openChatRoom);
