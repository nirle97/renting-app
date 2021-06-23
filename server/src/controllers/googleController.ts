import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { resTemplate } from "../utils/responses";
import { UserModel } from "../db/models/UserModel";
const { OAuth2Client } = require("google-auth-library");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const client = new OAuth2Client(process.env.CLIENT_ID);

interface Decoded extends Request {
  decoded: {
    imgUrl: String;
    fullName: String;
    email: String;
  };
}
const setToken = async (
  req: Decoded,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const tokenId = req.body.tokenId;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const credentials = {
      fullName: payload.name,
      email: payload.email,
      imgUrl: payload.picture,
    };
    await UserModel.create(credentials);
    req.decoded = credentials;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const googleController = {
  setToken,
};

export default googleController;
