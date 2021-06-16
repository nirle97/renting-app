import { Request, Response } from "express";
import { AptModel } from "../db/models/AptModel";
import { resTemplate } from "../utils/responses";
const addNewApt = async (req: Request, res: Response) => {
    if(!req.body) {
        res.status(400).send(resTemplate.clientError.badRequest)
        return 
    } 
    try {
        await AptModel.create(req.body)
        res.status(201).send(resTemplate.success.created)
    } catch(e) {
        console.error(e)
        res.status(500).send(resTemplate.serverError)
    }
    const aptDetails = req.body;
}

const aptController = {addNewApt}
export default aptController