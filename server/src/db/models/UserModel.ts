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
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  likedApts: {
    type: Array,
    unique: true,
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
