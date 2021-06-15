import {validToken} from "../utils/middleware/auth";
import { Decoded } from "../utils/interface"
const auth = require("express").Router();
const { sign, verify } = require("jsonwebtoken");
const authController = require("../controllers/authController");

auth.post("/tokenValidate", validToken, authController.vlidateToken)

auth.post("/create-token", authController.generateNewToken)

auth.post("/logout", validToken, authController.terminateToken)


module.exports = auth;
