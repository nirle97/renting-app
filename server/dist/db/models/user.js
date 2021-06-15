"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { IUser } = require("../utils/interface");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    likedApts: {
        type: Array
    },
    refreshToken: {
        type: Number,
    },
});
const UserModel = mongoose_1.default.model("UserModel", IUser);
module.exports = UserModel;
