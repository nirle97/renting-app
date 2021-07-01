export const login = require("express").Router();
import loginController from "../controllers/loginController";
import authController from "../controllers/authController";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

login.post("/sign-up", loginController.signUp);
login.post("/sign-in", loginController.signIn, authController.createToken);
login.post(
  "/profile-image",
  upload.single("image"),
  loginController.uploadProfileImg
);
