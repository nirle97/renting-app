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
export interface IApt extends Document  {
  ownerId: String;
  likedBy: String[];
  city: String;
  pricePerMonth: Number;
  }


export interface Decoded extends Request {
    decoded: IUser
 }

export interface IResDetails {
  success: {
      general: {
          success: Boolean;
          status: Number;
      },
      created: {
          success: Boolean;
          status: Number;
      }
  },
  serverError: {
      success: Boolean;
      status: Number;
      message: String;
  },
  clientError: {
      badRequest: {
          success: Boolean;
          status: Number;
          message: String;
      },
      unAuthorized: {
          success: Boolean;
          status: Number;
          message: String;
      },
      forbidden: {
          success: Boolean;
          status: Number;
          message: String;
      }
  }
}