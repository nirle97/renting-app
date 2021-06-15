import { Request, Response } from "express";
const auth = require("express").Router();
const { player } = require("../models");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const validToken = require("../utils/utils-auth");

auth.post("/tokenValidate", validToken, (req: Request, res: Response) => {
  if (req.decoded) return res.status(200).json({ valid: true });
});

auth.post("/token", async (req: Request, res: Response) => {
  try {
    let refreshToken = await player.findOne({
      attributes: ["refreshToken"],
      where: { email: req.body.email },
    });
    refreshToken = refreshToken.toJSON().refreshToken;
    verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Invalid Access Token");
      delete decoded.iat;
      delete decoded.exp;
      const accessToken = sign(decoded, process.env.JWT_SECRET, {
        expiresIn: "10s",
      });
      return res.status(200).send({ accessToken });
    });
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: "Unable to Refresh Access Token" });
  }
});

auth.post("/logout", validToken, (req: Request, res: Response) => {
  const user = req.decoded;
  player.update({ refreshToken: null }, { where: { email: user.email } });
  res.status(200).send({ message: "User Logged Out" });
});

module.exports = auth;
