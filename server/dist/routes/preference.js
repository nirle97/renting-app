"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preference = void 0;
const prefController_1 = __importDefault(require("../controllers/prefController"));
const auth_1 = require("../middleware/auth");
exports.preference = require("express").Router();
exports.preference.put("/user-preferences", auth_1.validToken, prefController_1.default.setUserPreferences);
exports.preference.get("/user-preferences", auth_1.validToken, prefController_1.default.getUserPreferences);
