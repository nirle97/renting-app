import { Document } from "mongoose"

export interface IUser extends Document  {
    name: String;
    email: String;
    password?: String;
    phoneNumber: String;
    age: Number;
    likedApts: {}[];
    refreshToken: String | null;
  }

export interface Decoded extends Request {
    decoded: IUser
 }