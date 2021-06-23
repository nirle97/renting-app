import googleController from "../controllers/googleController";
import authController from "../controllers/authController";
export const googleAuth = require("express").Router();
googleAuth.post(
  "/login",
  googleController.setToken,
  authController.createToken
);
