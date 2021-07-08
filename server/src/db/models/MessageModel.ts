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
  path: {
    type: String,
  },
});
export const MessageModel = mongoose.model<IMessage>(
  "MessageModel",
  messageSchema
);
