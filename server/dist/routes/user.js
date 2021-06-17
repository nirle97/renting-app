"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const auth_1 = require("../middleware/auth");
const userController_1 = __importDefault(require("../controllers/userController"));
exports.user = require("express").Router();
exports.user.get("/liked-apts", auth_1.validToken, userController_1.default.getLikedApts);
exports.user.get("/", auth_1.validToken, userController_1.default.getUser);
