"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        require: true,
    },
    chatRoomId: {
        type: String,
        require: true,
    },
    senderId: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: new Date().getTime(),
    },
    path: {
        type: String,
    },
});
exports.MessageModel = mongoose_1.default.model("MessageModel", messageSchema);
