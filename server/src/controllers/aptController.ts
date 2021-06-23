import { Request, Response } from "express";
import { AptModel } from "../db/models/AptModel";
import { UserModel } from "../db/models/UserModel";
import { IOwnerApt, IClientApt } from "../interfaces/interface";
import { resTemplate } from "../utils/responses";

interface Decoded extends Request {
  decoded: { id: String };
}

const addNewApt = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    if(Array.isArray(req.body)){
      req.body.map(async (obj) =>{
        const newAptObj: IOwnerApt = { ...obj, ownerId: req.decoded.id };
        await AptModel.create(newAptObj);

      })
    }else{
      const newAptObj: IOwnerApt = { ...req.body, ownerId: req.decoded.id };
      await AptModel.create(newAptObj);
    }
    
    res.status(201).send(resTemplate.success.created);
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
  const aptDetails = req.body;
};

const setLikeStatus = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.query.status || !req.params.aptId) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    await AptModel.updateLikeStatus(
      req.params.aptId,
      req.decoded.id,
      req.query.status.toString()
    );
    await UserModel.findOneAndUpdate(
      { _id: req.decoded.id },
      { $push: { likedApts: req.params.aptId } },
      { new: true }
    );
    res.status(200).send(resTemplate.success.general);
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const getAptsByFilters = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const data: IClientApt = req.body;
    console.log(data);
    
    const aptsArray = await AptModel.findByUserFilters(data, req.decoded.id);
    res.status(200).send({ ...resTemplate.success.general, data: aptsArray });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const getAptsByOwner = async (req: Decoded, res: Response): Promise<void> => {
  try {
    const aptsArray = await AptModel.find({ ownerId: req.decoded.id });
    res.status(200).send({ ...resTemplate.success.general, data: aptsArray });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const aptController = {
  addNewApt,
  setLikeStatus,
  getAptsByFilters,
  getAptsByOwner,
};
export default aptController;
