import store from "../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export interface IAction {
  type: String;
  payload?: any;
}

export interface IForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  age: number;
  password: string;
}

export interface IFilter {
    city: String,
    priceMin: Number,
    priceMax: Number
}

export interface IApt {
  city: string,
  images:string[],
  ownerId:string,
  pricePerMonth: number,
  
}