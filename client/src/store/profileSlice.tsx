import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
export interface ProfileState {
  isprofileClicked: boolean;
}
export const initialState: ProfileState = {
  isprofileClicked: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIsprofileClicked: (state, { payload }: PayloadAction<ProfileState>) => {
      state.isprofileClicked = payload.isprofileClicked;
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { setIsprofileClicked } = profileSlice.actions;
export const profileSelectors = (state: RootState) => state.profileReducer;
