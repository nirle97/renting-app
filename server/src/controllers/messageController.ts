import { Request, Response } from "express";
import { MessageModel } from "../db/models/MessageModel";
import { resTemplate } from "../utils/responses";
import { IMessage } from "../interfaces/interface";
interface Decoded extends Request {
  decoded: { id: String };
}
const setNewMessage = async (req: Decoded, res: Response): Promise<void> => {
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

const messageController = {
  setNewMessage,
};
export default messageController;
