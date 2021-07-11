"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = void 0;
const googleController_1 = __importDefault(require("../controllers/googleController"));
const authController_1 = __importDefault(require("../controllers/authController"));
exports.googleAuth = require("express").Router();
exports.googleAuth.post("/login", googleController_1.default.setToken, authController_1.default.createToken);
