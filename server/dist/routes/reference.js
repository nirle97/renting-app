"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reference = void 0;
const prefController_1 = __importDefault(require("../controllers/prefController"));
const auth_1 = require("../middleware/auth");
exports.reference = require("express").Router();
exports.reference.post("/user-preferences", auth_1.validToken, prefController_1.default.addUserPreferences);
exports.reference.put("/user-preferences", auth_1.validToken, prefController_1.default.updateUserPreferences);
