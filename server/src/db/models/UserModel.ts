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
  },
  refreshToken: {
    type: String,
    default: null,
  },
});
export const UserModel = mongoose.model<IUser>("UserModel", userSchema);
