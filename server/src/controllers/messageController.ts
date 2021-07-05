import { Request, Response } from "express";
import { MessageModel } from "../db/models/MessageModel";
import { resTemplate } from "../utils/responses";
import { IMessage } from "../interfaces/interface";

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

const messageController = {
  setNewMessage,getMessagesByRoomId
};
export default messageController;
