import { IAction } from "../interfaces/interface"

const signReducer = (state = false, action: IAction) => {
    switch (action.type) {
      case "LOGIN":
        return true;
      case "LOGOUT":
        return false;
      default:
        return state;
    }
  };
  
  export default signReducer;
  