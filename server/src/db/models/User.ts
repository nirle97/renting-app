import mongoose, { Document } from "mongoose"
import {IUser} from "../../utils/interface"

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  likedApts: {
    type: Array
  },
  refreshToken: {
    type: String,
    default: null
  },
});
export const UserModel = mongoose.model<IUser>("UserModel", userSchema);

