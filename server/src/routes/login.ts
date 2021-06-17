export const login = require("express").Router();
import loginController from "../controllers/loginController";
import authController from "../controllers/authController";

login.post("/sign-up", loginController.signUp);
login.post("/sign-in", loginController.signIn, authController.createToken);


