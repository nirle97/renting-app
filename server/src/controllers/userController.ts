import { Request, Response } from "express";
import mongoose from "mongoose"
import { UserModel } from "../db/models/UserModel";
import { AptModel } from "../db/models/AptModel";
import { resTemplate } from "../utils/responses";
interface Decoded extends Request {
    decoded: { id: String }
  }
const getUser = async (req: Decoded, res: Response): Promise<void> => {
    try {
        const user = await UserModel.findOne({_id: req.decoded.id},
             ["-refreshToken", "-likedApts", "-password", "-__v"])
        res.status(200).send({...resTemplate.success.general, data: user})
    } catch(e) {
        console.error(e)
        res.status(500).send(resTemplate.serverError)
    }

}
const getLikedApts = async (req: Decoded, res: Response): Promise<void> => {
    try {
       const data = await UserModel.findOne({_id: req.decoded.id}, ["likedApts"], {new: true})
       if (data) {
           const allApts = await AptModel.find({
               _id: { $in: data.likedApts}
           }, ["-__v", "-likedBy", "-disLikedBy"])
           res.status(200).send({...resTemplate.success.general, data: allApts})
       }        
    } catch(e) {
        console.error(e)
        res.status(500).send(resTemplate.serverError)
    }
}

const userController = { getUser, getLikedApts }
export default userController