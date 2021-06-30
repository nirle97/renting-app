import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUploadNewApt } from "../interfaces/interface";

export interface AptState {
  userApts: IUploadNewApt[];
}
export const initialState: AptState = {
  userApts: [],
};
export const aptSlice = createSlice({
  name: "userApts",
  initialState,
  reducers: {
    setAptsArray: (state, { payload }: PayloadAction<AptState>) => {
      state.userApts = payload.userApts;
    },
  },
});

export const aptReducer = aptSlice.reducer;
export const { setAptsArray } = aptSlice.actions;
export const aptSelectors = (state: RootState) => state.aptReducer;
