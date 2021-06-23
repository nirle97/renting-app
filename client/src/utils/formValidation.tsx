import { IUser, ISignIn } from "../interfaces/interface";
export default class FormValidation {
  static isFormEmpty = (formInput: IUser): boolean => {
    if (
      formInput.fullName === "" ||
      formInput.phoneNumber === "" ||
      formInput.email === "" ||
      formInput.password === "" ||
      formInput.age === ""
    ) {
      return false;
    }
    return true;
  };
  static isPasswordOk = (formInput: IUser | ISignIn): boolean => {
    if (
      /^[^<>%$]*$/.test(formInput.password) &&
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        formInput.password
      )
    ) {
      return true;
    }
    return false;
  };
  static isEmailOk = (formInput: IUser | ISignIn): boolean => {
    if (
      /^[^<>%$]*$/.test(formInput.email) &&
      /^\S+@\S+\.\S+$/.test(formInput.email)
    ) {
      return true;
    }
    return false;
  };
  static isNameOk = (formInput: IUser): boolean => {
    return /^[a-zA-Z][a-zA-Z\s]*$/.test(formInput.fullName);
  };
  static isNumberOk = (formInput: IUser): boolean => {
    if (/^\d+$/.test(formInput.phoneNumber) && /^\d+$/.test(formInput.age)) {
      return true;
    }
    return false;
  };
  static isFormValid = (formInput: IUser): boolean => {
    if (
      // FormValidation.isPasswordOk(formInput) &&
      FormValidation.isEmailOk(formInput) &&
      FormValidation.isNameOk(formInput) &&
      FormValidation.isNumberOk(formInput)
    ) {
      return true;
    }
    return false;
  };
}
