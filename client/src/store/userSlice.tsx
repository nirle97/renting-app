import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserState {
  user: {
    id: String;
    fullName: String;
    phoneNumber?: String;
    age?: Number;
    email: String;
    imgUrl: String;
  };
}
export const initialState: UserState = {
  user: {
    id: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    age: 0,
    imgUrl: "",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      state.user.id = payload.user.id;
      state.user.fullName = payload.user.fullName;
      state.user.phoneNumber = payload.user.phoneNumber;
      state.user.email = payload.user.email;
      state.user.age = payload.user.age;
      state.user.imgUrl = payload.user.imgUrl;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
export const userSelectors = (state: RootState) => state.userReducer;
