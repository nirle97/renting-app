import { Request, Response } from "express";
const { sign, verify } = require("jsonwebtoken");
import { UserModel } from "../db/models/UserModel";
import { resTemplate } from "../utils/responses";
require("dotenv").config();

interface Decoded extends Request {
  decoded: { id: string };
}
interface ISignInUser extends Request {
  exp?: number;
  iat?: number;
  decoded: {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    age?: number;
    isOwner: boolean;
    imgUrl?: string;
  };
}
const vlidateToken = (req: Request, res: Response): void => {
  res.status(200).send(resTemplate.success.general);
};

const generateNewToken = async (req: Request, res: Response): Promise<void> => {
  try {
    let refreshToken = await UserModel.findOne({ _id: req.body.id }, [
      "refreshToken",
    ]);
    verify(
      refreshToken?.refreshToken,
      process.env.JWT_SECRET,
      (err: Error, decoded: ISignInUser) => {
        if (err) {
          console.error(err);
          res.status(403).send(resTemplate.clientError.forbidden);
          return;
        }
        delete decoded.exp;
        delete decoded?.iat;

        const accessToken = sign(decoded, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        res.status(200).send({
          ...resTemplate.success.general,
          data: accessToken,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(401).send(resTemplate.clientError.unAuthorized);
  }
};

const terminateToken = async (req: Decoded, res: Response): Promise<void> => {
  try {
    const user = req.decoded;
    await UserModel.findOneAndUpdate({ _id: user.id }, { refreshToken: null });
    res.status(200).send(resTemplate.success.general);
  } catch (e) {
    res.status(401).send(resTemplate.clientError.unAuthorized);
  }
};
const createToken = async (req: ISignInUser, res: Response): Promise<void> => {
  try {
    const accessToken = sign(req.decoded, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = sign(req.decoded, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    await UserModel.findOneAndUpdate(
      { email: req.decoded.email },
      { refreshToken: refreshToken }
    );
    res.status(200).send({
      ...resTemplate.success.general,
      data: {
        accessToken,
        id: req.decoded.id,
        email: req.decoded.email,
        fullName: req.decoded.fullName,
        imgUrl: req.decoded.imgUrl,
        age: req.decoded.age,
        isOwner: req.decoded.isOwner,
        phoneNumber: req.decoded.phoneNumber,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const authController = {
  vlidateToken,
  generateNewToken,
  terminateToken,
  createToken,
};
export default authController;
