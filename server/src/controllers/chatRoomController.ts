import { Request, Response } from "express";
import { ChatRoomModel } from "../db/models/ChatRoomModel";
import { MessageModel } from "../db/models/MessageModel";
import { resTemplate } from "../utils/responses";
import { IChatRoom } from "../interfaces/interface";
import { AptModel } from "../db/models/AptModel";
import { UserModel } from "../db/models/UserModel";
interface Decoded extends Request {
  decoded: { id: String };
}
const openChatRoom = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const aptData: IChatRoom = req.body;
    const aptTitle = await AptModel.findOne({ _id: aptData.aptId }, ["title"]);
    const newRoom = await ChatRoomModel.create({
      title: aptTitle?.title,
      aptId: aptData.aptId,
      participants: aptData.participants,
    });
    await UserModel.updateOne(
      { _id: req.decoded.id },
      { $push: { openChats: aptData.participants.userInfo.id } }
    );
    await UserModel.updateOne(
      { _id: aptData.participants.userInfo.id },
      { $push: { openChats: req.decoded.id } }
    );
    res.status(200).send({ ...resTemplate.success.created, data: newRoom._id });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const closeChatRoom = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    await ChatRoomModel.deleteOne({
      title: req.body.title,
    });
    await MessageModel.deleteMany({
      chatRoomId: req.body.chatRoomId,
    });
    res.status(200).send(resTemplate.success.created);
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};
const getChatRoom = async (req: Decoded, res: Response): Promise<void> => {
  try {
    const chatRooms = await ChatRoomModel.find({
      $or: [
        { "participants.userInfo.id": req.decoded.id },
        { "participants.ownerInfo.id": req.decoded.id },
      ],
    });
    res.status(200).send({ ...resTemplate.success.general, data: chatRooms });
  } catch (e) {
    console.error(e);
    res.status(500).send(resTemplate.serverError);
  }
};

const chatRoomController = {
  openChatRoom,
  closeChatRoom,
  getChatRoom,
};
export default chatRoomController;
