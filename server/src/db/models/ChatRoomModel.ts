import mongoose from "mongoose";
import { IChatRoom } from "../../interfaces/interface";

const chatRoomSchema = new mongoose.Schema<IChatRoom>({
  title: {
    type: String,
    require: true,
  },
  aptId: {
    type: String,
    require: true,
  },
  participants: {
    type: Object,
    require: true,
  },
});
export const ChatRoomModel = mongoose.model<IChatRoom>(
  "ChatRoomModel",
  chatRoomSchema
);
