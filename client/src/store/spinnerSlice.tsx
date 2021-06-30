import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"
export interface SpinnerState {
  isDataLoading: boolean
}
export const initialState: SpinnerState = {
  isDataLoading: false
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    setIsDataLoading: (state, { payload }: PayloadAction<SpinnerState>) => {
      state.isDataLoading = payload.isDataLoading
    },
  },
});

export const spinnerReducer = spinnerSlice.reducer;
export const { setIsDataLoading } = spinnerSlice.actions;
export const spinnerSelectors = (state: RootState) => state.spinnerReducer
  