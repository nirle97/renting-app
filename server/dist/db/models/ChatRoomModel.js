"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomSchema = new mongoose_1.default.Schema({
    addresses: {
        type: Array,
        require: true,
    },
    aptId: {
        type: String,
        require: true,
    },
    participants: {
        type: Object,
        require: true,
    },
});
exports.ChatRoomModel = mongoose_1.default.model("ChatRoomModel", chatRoomSchema);
