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
  imgUrl?: string;
}

export interface IUploadNewApt {
  city: string;
  price: number;
}

export interface IFilter {
  city: String;
  priceMin: Number;
  priceMax: Number;
}

export interface IApt {
  city: string;
  images: string[];
  ownerId: string;
  pricePerMonth: number;
  _id: string;
  cords: {
    lat: number,
    lng: number
  };
}
