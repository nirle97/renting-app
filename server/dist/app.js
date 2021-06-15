"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = require("./routes/login");
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default());
exports.app.use("login", login_1.login);
