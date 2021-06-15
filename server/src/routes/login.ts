export const login = require("express").Router();
const loginController = require("../controllers/loginController");
login.post("/sign-up", loginController.signUp);
login.get("/sign-in", loginController.signIn);


