import { validToken } from "../middleware/auth";
export const auth = require("express").Router();
import authController from "../controllers/authController";

auth.post("/tokenValidate", validToken, authController.vlidateToken);
auth.post("/generate-new-token", authController.generateNewToken);
auth.post("/logout", validToken, authController.terminateToken);
