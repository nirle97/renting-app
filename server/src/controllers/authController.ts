import { Request, Response } from "express";
const { sign, verify } = require("jsonwebtoken");
import {validToken} from "../utils/middleware/auth";
import { IUser } from "../utils/interface"
import { UserModel } from "../db/models/User"
interface Decoded extends Request {
  decoded: IUser
}
export const vlidateToken = (req: Request, res: Response) => {
    res.status(200).send({
        success: true,
        status: 200,
        message: "valid token"
      })
}

export const generateNewToken = async (req: Request, res: Response) => {
    try {
      let refreshToken = await UserModel.findOne({email: req.body.email}, "refreshToken")

      verify(refreshToken, process.env.JWT_SECRET, (err: Error, decoded: IUser) => {
        if (err) return res.status(403).send("Invalid RefreshToken Token");
        const accessToken = sign(decoded, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        return res.status(200).send({ 
            success: true,
            statue: 200,
            data: accessToken 
        });
      });
    } catch (e) {
      console.log(e);
      return res.status(401).send({ 
          success: false,
          status: 401,
          message: "Unable to Refresh Access Token" 
        });
    }
}

export const terminateToken = async (req: Decoded, res: Response) => {
    try {
        const user = req.decoded;
        const a = req.body
        await UserModel.findOneAndUpdate({ email: user.email }, {refreshToken: null});
        res.status(200).send({ 
            success: true,
            statue: 200,
        });
      } catch(e) {
        res.status(401).send({ 
            success: false,
            status: 401,
            message: "Unable to terminate Refresh Token" 
        })
      }
}

export const createToken = async (req: Decoded, res: Response) => {
  try {
    const accessToken = sign(req.decoded, process.env.JWT_SECRET, {
          expiresIn: "10m",
        });
        const refreshToken = sign(req.decoded, process.env.JWT_SECRET, {
          expiresIn: "6h",
        });
        await UserModel.findOneAndUpdate({ email: req.decoded.email }, {refreshToken: req.decoded.refreshToken});
        res.status(200).send({
          success: true,
          status: 200,
          data: accessToken
        })
  } catch(e) {
    console.error(e)
    res.status(500).send({
      success: false,
      status: 500,
      message: "Unable to create new token"
    })
  }
}





