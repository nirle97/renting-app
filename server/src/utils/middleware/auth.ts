import { Request, Response, NextFunction } from "express";
const { verify } = require("jsonwebtoken");
require("dotenv").config();
const validToken = (req: Request, res: Respose, next: NextFunction) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Invalid Access Token");
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send("Access Token Required");
  }
};

module.exports = validToken;
