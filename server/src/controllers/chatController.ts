import { Request, Response } from "express";
import { ChatRoomModel } from "../db/models/ChatRoomModel";
import { resTemplate } from "../utils/responses";
interface Decoded extends Request {
  decoded: { id: String };
}
const openChatRoom = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    await ChatRoomModel.create({})
    res.status(200).send(resTemplate.success.created);
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const chatController = {
  openChatRoom,
};
export default chatController;
