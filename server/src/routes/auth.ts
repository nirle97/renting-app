import {validToken} from "../middleware/auth";
import { Decoded } from "../interfaces/interface"
export const auth = require("express").Router();
const { sign, verify } = require("jsonwebtoken");
import authController from "../controllers/authController";

auth.post("/tokenValidate", validToken, authController.vlidateToken)
auth.post("/generate-new-token", authController.generateNewToken)
auth.post("/logout", validToken, authController.terminateToken)