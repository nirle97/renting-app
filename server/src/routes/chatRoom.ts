import { validToken } from "../middleware/auth";
export const chatRoom = require("express").Router();
import chatRoomController from "../controllers/chatRoomController";

chatRoom.post("/create-chat-room", validToken, chatRoomController.openChatRoom);
