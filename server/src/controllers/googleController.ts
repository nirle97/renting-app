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
    id?: String;
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
  if (!req.body || Object.keys(req.body).length === 0) {
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
    const count = await UserModel.countDocuments({ email: credentials.email });
    let user;
    if (count === 0) {
      user = await UserModel.create(credentials);
      req.decoded = { ...credentials, id: user?._id };
      next();
    } else {
      user = await UserModel.findOne({ email: credentials.email });
      if (user) {
        req.decoded = user.toJSON();
        next();
      }
    }
  } catch (e) {
    console.log(1);

    console.error(e);
    if (e.message.includes("duplicate key error")) {
      res.status(409).send(resTemplate.alreadyExists);
    } else {
      res.status(500).send(resTemplate.serverError);
    }
  }
};

const googleController = {
  setToken,
};

export default googleController;
