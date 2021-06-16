import { Request, Response, NextFunction } from "express";
const { verify } = require("jsonwebtoken");
import { IUser } from "../interfaces/interface"
interface Decoded extends Request {
  decoded: IUser
}
export const validToken = (req: Decoded, res: Response, next: NextFunction) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err: Error, decoded: IUser) => {
      if (err) return res.status(403).send("Invalid Access Token");
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send("Access Token Required");
  }
};

