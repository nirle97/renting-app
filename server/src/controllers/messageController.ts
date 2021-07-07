import { Request, Response } from "express";
import { MessageModel } from "../db/models/MessageModel";
import { resTemplate } from "../utils/responses";
import { IMessage } from "../interfaces/interface";
import { uploadFile } from "../utils/s3";
import util from "util";
import fs from "fs";
import { getFileStream } from "../utils/s3";
interface Decoded extends Request {
  decoded: { id: String };
}
const unlinkFile = util.promisify(fs.unlink);

const setNewMessage = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    await MessageModel.create(req.body as IMessage);
    res.status(200).send(resTemplate.success.created);
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const getMessagesByRoomId = async (req: Request, res: Response): Promise<void> => {
  if (!req.body || !req.params) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const messages = await MessageModel.find({ chatRoomId: req.params.roomId } );
    res.status(200).send({ ...resTemplate.success.general, data: messages });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const setNewFileMessage = async (req: Request, res: Response): Promise<void> => {
  if (!req.body || !req.file) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    await uploadFile(req.file.path, req.file.filename);
    await unlinkFile(req.file.path);
    await MessageModel.create({...req.body, path: `/messsage/get-file/${ req.file.filename}`} as IMessage);
    res.status(201).send({
      ...resTemplate.success.created
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const getFile = async (req: Decoded, res: Response) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
};
const messageController = {
  setNewMessage,getMessagesByRoomId,setNewFileMessage,getFile,
};
export default messageController;
