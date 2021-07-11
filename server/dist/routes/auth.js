"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_1 = require("../middleware/auth");
exports.auth = require("express").Router();
const authController_1 = __importDefault(require("../controllers/authController"));
exports.auth.post("/tokenValidate", auth_1.validToken, authController_1.default.vlidateToken);
exports.auth.post("/generate-new-token", authController_1.default.generateNewToken);
exports.auth.post("/logout", auth_1.validToken, authController_1.default.terminateToken);
