import { Request, Response, NextFunction } from "express";
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
import { UserModel } from "../db/models/UserModel";
import { IUser } from "../interfaces/interface";
import { resTemplate } from "../utils/responses";

interface Decoded extends Request {
  decoded: { id: String };
}
const signUp = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }

  const credentials = req.body;
  credentials.password = hashSync(credentials.password, genSaltSync(10));

  try {
    await UserModel.create(credentials, { new: true });
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
    const result = await UserModel.findOne({ email: credentials.email });
    if (result) {
      const isPasswordCorrect = compareSync(
        credentials.password,
        result.password
      );
      if (!isPasswordCorrect)
        res.status(401).send(resTemplate.clientError.unAuthorized);
      req.decoded = { id: result._id };
      next();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const loginController = { signUp, signIn };
export default loginController;