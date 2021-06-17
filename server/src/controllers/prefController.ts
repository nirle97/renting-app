import { Request, Response } from "express";
import { UserPrefModel } from "../db/models/UserPrefModel";
import { resTemplate } from "../utils/responses";
interface Decoded extends Request {
    decoded: { id: String }
  }
const addUserPreferences = async (req: Decoded, res: Response): Promise<void> => {
    if (!req.body) {
        res.status(400).send(resTemplate.clientError.badRequest)
        return 
    } 
    try {
        await UserPrefModel.create({userId: req.decoded.id, preferences: {...req.body}})
        res.status(200).send(resTemplate.success.created)
        
    } catch(e) {
        console.error(e)
        res.status(500).send(resTemplate.serverError)
    }
}

const updateUserPreferences = async (req: Decoded, res: Response): Promise<void> => {
    if (!req.body) {
        res.status(400).send(resTemplate.clientError.badRequest)
        return 
    } 
    try {
        await UserPrefModel.updateOne({userId: req.decoded.id},{userId: req.decoded.id, preferences: {...req.body}})
        res.status(200).send(resTemplate.success.general)
        
    } catch(e) {
        console.error(e)
        res.status(500).send(resTemplate.serverError)
    }
}

const prefController = { addUserPreferences, updateUserPreferences }
export default prefController