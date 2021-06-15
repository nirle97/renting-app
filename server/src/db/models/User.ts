import mongoose, { Document } from "mongoose"
const {IUser} = require("../utils/interface")

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
    type: Number,
  },
});
const UserModel = mongoose.model<IUser>("UserModel", IUser);

module.exports = UserModel