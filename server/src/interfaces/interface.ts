import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: String;
  email: String;
  password?: String;
  phoneNumber: String;
  age: Number;
  isOwner: Boolean;
  likedApts: {}[];
  refreshToken?: String | null;
  imgUrl: String;
}
export interface IOwnerApt extends Document {
  ownerId: String;
  likedBy: string[] ;
  likedByUser?: {}[];
  disLikedBy: string[];
  address: string;
  cords: {
    lat: number;
    lng: number;
  };
  pricePerMonth: number;
  imagesUrl: string[];
  rentalType: string;
  entryDate: number;
  checkOutDate: number;
  size: number;
  floor: number;
  rooms: number;
  parking: boolean;
  porch: boolean;
  garden: boolean;
  furnished: boolean;
  elevator: boolean;
  handicapAccessible: boolean;
  petsAllowed: boolean;
  smokeAllowed: boolean;
}

export interface IClientApt extends Document {
  address: string;
  priceMin: number;
  priceMax: number;
  rentalType: string;
  entryDate: number;
  checkOutDate: number;
  sizeMin: number;
  sizeMax: number;
  roomsMin: number;
  roomsMax: number;
  parking: boolean;
  porch: boolean;
  garden: boolean;
  furnished: boolean;
  elevator: boolean;
  handicapAccessible: boolean;
  petsAllowed: boolean;
  smokeAllowed: boolean;
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
