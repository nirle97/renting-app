import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  age: number;
  isOwner: boolean;
  likedApts: {}[];
  refreshToken?: string | null;
  imgUrl: string;
  openChats: string[];
}

export interface IOwnerApt extends Document {
  ownerId: string;
  title: string;
  likedBy: string[];
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
  userId: string;
  preferences: IClientApt;
}

export interface IResDetails {
  success: {
    general: {
      success: boolean;
      status: number;
    };
    created: {
      success: boolean;
      status: number;
    };
    noContent: {
      success: boolean;
      status: number;
      message: string;
    };
  };
  serverError: {
    success: boolean;
    status: number;
    message: string;
  };
  clientError: {
    badRequest: {
      success: boolean;
      status: number;
      message: string;
    };
    unAuthorized: {
      success: boolean;
      status: number;
      message: string;
    };
    forbidden: {
      success: boolean;
      status: number;
      message: string;
    };
  };
}
export interface Decoded extends Request {
  decoded: IUser;
}
export interface IChatRoom extends Document {
  addresses?: { address: string }[];
  aptId: string;
  participants: {
    ownerInfo: {
      id: string;
      imgUrl: string;
      fullName: string;
    };
    userInfo: {
      id: string;
      imgUrl: string;
      fullName: string;
    };
  };
}
export interface IMessage extends Document {
  text: string;
  chatRoomId: string;
  senderId: string;
  createdAt: Date;
}
