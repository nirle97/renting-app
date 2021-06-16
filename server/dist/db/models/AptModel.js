"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const aptSchema = new mongoose_1.default.Schema({
    ownerId: {
        type: String,
        require: true
    },
    likedBy: {
        type: Array,
    },
    city: {
        type: String,
        require: true
    },
    pricePerMonth: {
        type: Number,
        require: true
    }
});
exports.AptModel = mongoose_1.default.model("AptModel", aptSchema);
