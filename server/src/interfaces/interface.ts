import { Document } from "mongoose";

export interface IUser extends Document {
  name: String;
  email: String;
  password?: String;
  phoneNumber: String;
  age: Number;
  likedApts: {}[];
  refreshToken?: String | null;
}
export interface IOwnerApt extends Document {
  ownerId: String;
  likedBy: String[];
  disLikedBy: String[];
  city: String;
  pricePerMonth: Number;
}

export interface IClientApt extends Document {
  city: String;
  priceMin: Number;
  priceMax: Number;
}
export interface IClientPref extends Document {
  userId: String;
  preferences: IClientApt;
}

export interface IResDetails {
  success: {
    general: {
      success: Boolean;
      status: Number;
    };
    created: {
      success: Boolean;
      status: Number;
    };
    noContent: {
      success: Boolean;
      status: Number;
      message: String;
    };
  };
  serverError: {
    success: Boolean;
    status: Number;
    message: String;
  };
  clientError: {
    badRequest: {
      success: Boolean;
      status: Number;
      message: String;
    };
    unAuthorized: {
      success: Boolean;
      status: Number;
      message: String;
    };
    forbidden: {
      success: Boolean;
      status: Number;
      message: String;
    };
  };
}
export interface Decoded extends Request {
  decoded: IUser;
}
