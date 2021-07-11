"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const auth_1 = require("../middleware/auth");
const messageController_1 = __importDefault(require("../controllers/messageController"));
exports.message = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
exports.message.post("/create-message", messageController_1.default.setNewMessage);
exports.message.get("/messages/:roomId", auth_1.validToken, messageController_1.default.getMessagesByRoomId);
exports.message.post("/send-file", auth_1.validToken, upload.single("file"), messageController_1.default.setNewFileMessage);
exports.message.get("/get-file/:key", messageController_1.default.getFile);
