import { IForm, ISignIn } from "../interfaces/interface";
export default class FormValidation {
  static isFormEmpty = (formInput: IForm): boolean => {
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
  static isPasswordOk = (formInput: IForm | ISignIn): boolean => {
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
  static isEmailOk = (formInput: IForm | ISignIn): boolean => {
    if (
      /^[^<>%$]*$/.test(formInput.email) &&
      /^\S+@\S+\.\S+$/.test(formInput.email)
    ) {
      return true;
    }
    return false;
  };
  static isNameOk = (formInput: IForm): boolean => {
    return /^[a-zA-Z][a-zA-Z\s]*$/.test(formInput.fullName);
  };
  static isNumberOk = (formInput: IForm): boolean => {
    if (/^\d+$/.test(formInput.phoneNumber) && /^\d+$/.test(formInput.age)) {
      return true;
    }
    return false;
  };
  static isFormValid = (formInput: IForm): boolean => {
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
