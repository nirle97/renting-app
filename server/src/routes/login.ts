export const login = require("express").Router();
const loginController = require("../controllers/loginController");
const authController = require("../routes/auth");
login.post("/sign-up", loginController.signUp);
login.get("/sign-in", loginController.signIn, authController.createToken);


