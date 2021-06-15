import { Request, Response, NextFunction} from "express";
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const UserModel = require("../db/models/User")
import { IUser } from "../utils/interface"

interface Decoded extends Request {
    decoded: IUser
 }
export const signUp = async (req: Request, res: Response) => {
    if(!req.body) return res.status(400).send({
        success: false,
        status: 400,
        message: "The server could not understand the request due to empty body"
    })
    const credentials = req.body;
    credentials.password = hashSync(credentials.password, genSaltSync(10));

    try {
        await UserModel.create(credentials)
        res.status(201).send({
            success: true,
            status: 201,
        })
    } catch(e) {
        console.error(e)
        res.status(500).send({
            success: false,
            status: 500,
            message: e.message
        })
    }
}
export const signIn = async (req: Decoded, res: Response, next: NextFunction) => {
    if(!req.body) return res.status(400).send({
        success: false,
        status: 400,
        message: "The server could not understand the request due to empty body"
    })
    const credentials = req.body;
    try {
        const result = await UserModel.findOne({email: credentials.email}, "email password")
        const isPasswordCorrect = compareSync(result.password, credentials.password);
        if (!isPasswordCorrect)
          return res.status(401).send({
            success: false,
            status: 401,
            message: "User or password incorrect"
        });
        req.decoded = result
        next()

    } catch(e) {
        console.error(e)
        res.status(500).send({
            success: false,
            status: 500,
            message: e.message
        })
    }

}