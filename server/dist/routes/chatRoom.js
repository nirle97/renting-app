"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoom = void 0;
const auth_1 = require("../middleware/auth");
exports.chatRoom = require("express").Router();
const chatRoomController_1 = __importDefault(require("../controllers/chatRoomController"));
exports.chatRoom.post("/create-chat-room", auth_1.validToken, chatRoomController_1.default.openChatRoom);
exports.chatRoom.get("/get-rooms", auth_1.validToken, chatRoomController_1.default.getChatRoom);
exports.chatRoom.delete("/delete-room/:roomId", auth_1.validToken, chatRoomController_1.default.deleteChatRoom);
