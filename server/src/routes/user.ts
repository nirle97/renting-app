import { validToken } from "../middleware/auth";
import userController from "../controllers/userController";
export const user = require("express").Router();
user.get("/", validToken, userController.getUser);
user.get("/liked-apts", validToken, userController.getLikedApts);
user.get("/profile-image/:key", userController.getProfileImg);
