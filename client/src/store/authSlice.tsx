import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from './store'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export interface AuthState {
  isLogged: boolean
}
export const initialState: AuthState = {
  isLogged: false
}

export type RootState = ReturnType<typeof store.getState>;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogged: (state, { payload }: PayloadAction<AuthState>) => {
      state.isLogged = payload.isLogged;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLogged } = authSlice.actions;
export const authSelectors = (state: RootState) => state.rootReducer.authReducer