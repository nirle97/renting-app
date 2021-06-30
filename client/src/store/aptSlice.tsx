import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUploadNewApt } from "../interfaces/interface";

export interface AptState {
  userApts: IUploadNewApt[];
}
export const initialState: AptState = {
  userApts: [],
  // {
  //   address: "",
  //   imagesUrl: [],
  //   cords: {
  //     lat: 0,
  //     lng: 0,
  //   },
  //   pricePerMonth: 0,
  //   size: 0,
  //   floor: 0,
  //   rooms: 0,
  //   rentalType: "",
  //   entryDate: new Date().toLocaleDateString(),
  //   checkOutDate: new Date().toLocaleDateString(),
  //   parking: false,
  //   porch: false,
  //   garden: false,
  //   furnished: false,
  //   elevator: false,
  //   handicapAccessible: false,
  //   petsAllowed: false,
  //   smokeAllowed: false,
  // },
};
export const aptSlice = createSlice({
  name: "userApts",
  initialState,
  reducers: {
    setAptsArray: (state, { payload }: PayloadAction<AptState>) => {
      state.userApts = payload.userApts;
      // state.userApts.address = payload.userApts.address;
      // state.userApts.imagesUrl = payload.userApts.imagesUrl;
      // state.userApts.pricePerMonth = payload.userApts.pricePerMonth;
      // state.userApts.size = payload.userApts.size;
      // state.userApts.floor = payload.userApts.floor;
      // state.userApts.rooms = payload.userApts.rooms;
      // state.userApts.rentalType = payload.userApts.rentalType;
      // state.userApts.entryDate = payload.userApts.entryDate;
      // state.userApts.checkOutDate = payload.userApts.checkOutDate;
      // state.userApts.parking = payload.userApts.parking;
      // state.userApts.porch = payload.userApts.porch;
      // state.userApts.garden = payload.userApts.garden;
      // state.userApts.furnished = payload.userApts.furnished;
      // state.userApts.elevator = payload.userApts.elevator;
      // state.userApts.handicapAccessible = payload.userApts.handicapAccessible;
      // state.userApts.petsAllowed = payload.userApts.petsAllowed;
      // state.userApts.smokeAllowed = payload.userApts.smokeAllowed;
    },
  },
});

export const aptReducer = aptSlice.reducer;
export const { setAptsArray } = aptSlice.actions;
export const aptSelectors = (state: RootState) => state.aptReducer;
