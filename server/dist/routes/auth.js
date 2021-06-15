"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require("express").Router();
const { player } = require("../models");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const validToken = require("../utils/utils-auth");
auth.post("/tokenValidate", validToken, (req, res) => {
    if (req.decoded)
        return res.status(200).json({ valid: true });
});
auth.post("/token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let refreshToken = yield player.findOne({
            attributes: ["refreshToken"],
            where: { email: req.body.email },
        });
        refreshToken = refreshToken.toJSON().refreshToken;
        verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).send("Invalid Access Token");
            delete decoded.iat;
            delete decoded.exp;
            const accessToken = sign(decoded, process.env.JWT_SECRET, {
                expiresIn: "10s",
            });
            return res.status(200).send({ accessToken });
        });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ message: "Unable to Refresh Access Token" });
    }
}));
auth.post("/logout", validToken, (req, res) => {
    const user = req.decoded;
    player.update({ refreshToken: null }, { where: { email: user.email } });
    res.status(200).send({ message: "User Logged Out" });
});
module.exports = auth;
