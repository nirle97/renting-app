export interface IAction {
  type: String;
  payload?: any;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IUser extends ISignIn {
  id?: string;
  fullName: string;
  phoneNumber: string;
  age: string;
  imgUrl: string;
}

export interface IUploadNewApt {
  address: string;
  pricePerMonth: number;
  images: string[];
  rentalType: string;
  entryDate: string;
  checkOutDate: string;
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

export interface IFilter {
  address: string;
  priceMin: number;
  priceMax: number;
  rentalType: string;
  entryDate: Date;
  checkOutDate: Date;
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

export interface IApt {
  address: string;
  images: string[];
  ownerId: string;
  pricePerMonth: number;
  _id: string;
  cords: {
    lat: number;
    lng: number;
  };
}

export interface IAdvancedPref {
  rentalType: string;
  entryDate: Date;
  checkOutDate: Date;
  parking: boolean;
  porch: boolean;
  garden: boolean;
  furnished: boolean;
  elevator: boolean;
  handicapAccessible: boolean;
  petsAllowed: boolean;
  smokeAllowed: boolean;
}
