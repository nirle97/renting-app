import mongoose from "mongoose";
import { IUser } from "../../interfaces/interface";

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  isOwner: {
    type: Boolean,
    require: true,
    default: false,
  },
  likedApts: {
    type: Array,
    default: [],
    sparse: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  imgUrl: {
    type: String,
  },
});
export const UserModel = mongoose.model<IUser>("UserModel", userSchema);
