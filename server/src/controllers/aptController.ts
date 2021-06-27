import { Request, Response } from "express";
import { AptModel } from "../db/models/AptModel";
import { UserModel } from "../db/models/UserModel";
import { IOwnerApt, IClientApt } from "../interfaces/interface";
import { resTemplate } from "../utils/responses";
import { uploadFile, getFileStream } from "../utils/s3";
import fs from "fs";
import util from "util";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);
interface Decoded extends Request {
  decoded: { id: String };
}

const addNewApt = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
      const newAptObj: IOwnerApt = { 
        ...req.body,
        ownerId: req.decoded.id,
        entryDate: dateConvertor(req.body.entryDate),
        checkOutDate: dateConvertor(req.body.checkOutDate),
       };
      console.log(newAptObj);
      await AptModel.create(newAptObj);
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
    const data: IClientApt = {
      ...req.body,
      entryDate: dateConvertor(req.body.entryDate),
      checkOutDate: dateConvertor(req.body.checkOutDate),
    };
    console.log(data);
    const aptsArray = await AptModel.findByUserFilters(data, req.decoded.id);
    console.log(aptsArray);
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

const uploadAptImages = async (req: Request, res: Response): Promise<void> => {
  if (!req.files || !req.files.length) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const aptImgsUrls = [];
    const files: any = req.files;
    for (let i = 0; i < req.files.length; i++) {
      const file = files[i];
      const result = await uploadFile(file.path, file.filename);
      aptImgsUrls.push(`/apartment/apt-images/${result.Key}`);
      await unlinkFile(file.path);
    }
    res.status(201).send({
      ...resTemplate.success.created,
      data: aptImgsUrls,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const getAptImg = async (req: Decoded, res: Response) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
};
function dateConvertor(date:Date): number {
  return (new Date(date)).getTime()

}
const aptController = {
  addNewApt,
  setLikeStatus,
  getAptsByFilters,
  getAptsByOwner,
  uploadAptImages,
  getAptImg,
};
export default aptController;
