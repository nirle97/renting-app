import mongoose from "mongoose";
import { IMessage } from "../../interfaces/interface";

const messageSchema = new mongoose.Schema<IMessage>({
  text: {
    type: String,
    require: true,
  },
  chatRoomId: {
    type: String,
    require: true,
  },
  senderId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  },
});
export const messageModels = mongoose.model<IMessage>(
  "messageModels",
  messageSchema
);
