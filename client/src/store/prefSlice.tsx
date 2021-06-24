import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Cookies from "js-cookie";

export interface PrefState {
  preferences: {
    userId: string | undefined;
    address: string;
    pricePerMonth: number;
    rentalType: string;
    entryDate: Date;
    checkOutDate: Date;
    size: number;
    floor: number;
    rooms: number;
    parking: number;
    porch: boolean;
    garden: boolean;
    furnished: boolean;
    elevator: boolean;
    handicapAccessible: boolean;
    petsAllowed: boolean;
    smokeAllowed: boolean;
  };
}
export const initialState: PrefState = {
  preferences: {
    userId: Cookies.get("id"),
    address: "",
    pricePerMonth: 0,
    rentalType: "",
    entryDate: new Date(),
    checkOutDate: new Date(),
    size: 0,
    floor: 0,
    rooms: 0,
    parking: 0,
    porch: false,
    garden: false,
    furnished: false,
    elevator: false,
    handicapAccessible: false,
    petsAllowed: false,
    smokeAllowed: false,
  },
};
export const prefSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, { payload }: PayloadAction<PrefState>) => {
      state.preferences.address = payload.preferences.address;
      state.preferences.pricePerMonth = payload.preferences.pricePerMonth;
      state.preferences.rentalType = payload.preferences.rentalType;
      state.preferences.entryDate = payload.preferences.entryDate;
      state.preferences.checkOutDate = payload.preferences.checkOutDate;
      state.preferences.size = payload.preferences.size;
      state.preferences.floor = payload.preferences.floor;
      state.preferences.rooms = payload.preferences.rooms;
      state.preferences.parking = payload.preferences.parking;
      state.preferences.porch = payload.preferences.porch;
      state.preferences.garden = payload.preferences.garden;
      state.preferences.furnished = payload.preferences.furnished;
      state.preferences.elevator = payload.preferences.elevator;
      state.preferences.handicapAccessible =
        payload.preferences.handicapAccessible;
      state.preferences.petsAllowed = payload.preferences.petsAllowed;
      state.preferences.smokeAllowed = payload.preferences.smokeAllowed;
    },
  },
});

export const prefReducer = prefSlice.reducer;
export const { setPreferences } = prefSlice.actions;
export const prefSelectors = (state: RootState) => state.prefReducer;
