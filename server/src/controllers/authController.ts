import { Request, Response } from "express";
const { sign, verify } = require("jsonwebtoken");
import { IUser } from "../interfaces/interface";
import { UserModel } from "../db/models/UserModel";
import { resTemplate } from "../utils/responses";

require("dotenv").config();
interface Decoded extends Request {
  decoded: { id: String };
}
const vlidateToken = (req: Request, res: Response): void => {
  res.status(200).send(resTemplate.success.general);
};

const generateNewToken = async (req: Request, res: Response): Promise<void> => {
  try {
    let refreshToken = await UserModel.findOne(
      { _id: req.body.id },
      "refreshToken"
    );
    verify(
      refreshToken,
      process.env.JWT_SECRET,
      (err: Error, decoded: Decoded["decoded"]) => {
        if (err) {
          res.status(403).send(resTemplate.clientError.forbidden);
          return;
        }
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
    console.log(e);
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
const createToken = async (req: Decoded, res: Response): Promise<void> => {
  try {
    const accessToken = sign(req.decoded, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    const refreshToken = sign(req.decoded, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    await UserModel.findOneAndUpdate(
      { _id: req.decoded.id },
      { refreshToken: refreshToken },
      { new: true }
    );
    res.status(200).send({
      ...resTemplate.success.general,
      data: { accessToken, id: req.decoded.id },
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
