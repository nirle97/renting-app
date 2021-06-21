export interface IAction {
  type: String;
  payload?: any;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IForm extends ISignIn {
  fullName: string;
  phoneNumber: string;
  age: string;
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
}
