"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: String,
        default: "Anonymous",
    },
    date: {
        type: String,
    },
    sentimentScore: {
        type: Number,
        default: 0,
    },
});
const PasteModel = mongoose_1.default.model("PasteModel", pastesSchema);
