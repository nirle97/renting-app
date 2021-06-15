"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
exports.login = require("express").Router();
const loginController = require("../controllers/loginController");
const authController = require("../routes/auth");
exports.login.post("/sign-up", loginController.signUp);
exports.login.get("/sign-in", loginController.signIn, authController.createToken);
