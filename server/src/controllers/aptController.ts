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
      entryDate: dateToMilliSc(req.body.entryDate),
      checkOutDate: dateToMilliSc(req.body.checkOutDate),
    };
    const newApt = await AptModel.create(newAptObj);
    res
      .status(201)
      .send({ ...resTemplate.success.created, data: { id: newApt._id } });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
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
      entryDate: dateToMilliSc(req.body.entryDate),
      checkOutDate: dateToMilliSc(req.body.checkOutDate),
    };
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
const getAptsByLikes = async (req: Decoded, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById({ _id: req.decoded.id }, [
      "likedApts",
    ]);
    if (user) {
      const aptsArray = await AptModel.find({ _id: { $in: user.likedApts } });
      res.status(200).send({ ...resTemplate.success.general, data: aptsArray });
    } else {
      res.status(200).send(resTemplate.success.noContent);
    }
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
    const aptId = req.body.description;
    const aptImgsUrls = [];
    const files: any = req.files;
    for (let i = 0; i < req.files.length; i++) {
      const file = files[i];
      const result = await uploadFile(file.path, file.filename);
      aptImgsUrls.push(`/apartment/apt-images/${result.Key}`);
      await AptModel.updateOne({ _id: aptId }, { imagesUrl: aptImgsUrls });
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
function dateToMilliSc(date: Date): number {
  return new Date(date).getTime();
}
const aptController = {
  addNewApt,
  setLikeStatus,
  getAptsByFilters,
  getAptsByOwner,
  uploadAptImages,
  getAptImg,
  getAptsByLikes,
};
export default aptController;
