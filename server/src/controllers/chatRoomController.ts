import { Request, Response } from "express";
import { ChatRoomModel } from "../db/models/ChatRoomModel";
import { MessageModel } from "../db/models/MessageModel";
import { resTemplate } from "../utils/responses";
import { IChatRoom, IOwnerApt } from "../interfaces/interface";
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
    const ownerId: string = aptData.participants.ownerInfo.id;
    const userId: string = aptData.participants.userInfo.id;
    const ownerAptsAddress: IOwnerApt[] = await AptModel.find({ ownerId }, [
      "address",
      "likedBy",
      "-_id",
    ]);
    const relevantAddresses = ownerAptsAddress.map((apt) => {
      const likedUserId = apt.likedBy.map((aptUserId) => {
        if (aptUserId === userId) {
          return aptUserId;
        } else {
          return false;
        }
      });
      if (likedUserId) return apt.address;
    });
    const newRoom = await ChatRoomModel.create({
      addresses: relevantAddresses,
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

const deleteChatRoom = async (req: Decoded, res: Response): Promise<void> => {
  if (!req.params) {
    res.status(400).send(resTemplate.clientError.badRequest);
    return;
  }
  try {
    const roomId = req.params.roomId;
    await ChatRoomModel.deleteOne({
      _id: roomId,
    });
    await MessageModel.deleteMany({
      chatRoomId: roomId,
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
  deleteChatRoom,
  getChatRoom,
};
export default chatRoomController;
