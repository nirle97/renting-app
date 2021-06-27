import { Request, Response, NextFunction } from "express";
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
import { UserModel } from "../db/models/UserModel";
import { IUser } from "../interfaces/interface";
import { resTemplate } from "../utils/responses";
import { uploadFile } from "../utils/s3";
import fs from "fs";
import util from "util";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);

interface Decoded extends Request {
  decoded: {
    id: String;
    fullName: String;
    email: String;
    phoneNumber: String;
    age: Number;
    isOwner: Boolean;
    imgUrl: String;
  };
}
const signUp = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  const credentials = req.body;
  credentials.password = hashSync(credentials.password, genSaltSync(10));

  try {
    await UserModel.create(credentials);
    res.status(201).send(resTemplate.success.created);
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const signIn = async (
  req: Decoded,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  const credentials = req.body;

  try {
    const result: IUser | null = await UserModel.findOne({
      email: credentials.email,
    });
    if (result) {
      const isPasswordCorrect = compareSync(
        credentials.password,
        result.password
      );
      if (!isPasswordCorrect) {
        res.status(401).send(resTemplate.clientError.unAuthorized);
      }
      req.decoded = {
        id: result._id,
        fullName: result.fullName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        age: result.age,
        isOwner: result.isOwner,
        imgUrl: result.imgUrl,
      };
      next();
    }else{
      res.status(401).send(resTemplate.clientError.unAuthorized);
    }

  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const uploadProfileImg = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const result = await uploadFile(req.file.path, req.file.filename);
    await unlinkFile(req.file.path);
    res.status(201).send({
      ...resTemplate.success.created,
      data: `/user/profile-image/${result.Key}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const loginController = { signUp, signIn, uploadProfileImg };
export default loginController;
