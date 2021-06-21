import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    age: 0,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        id: action.payload.id,
        fullName: action.payload.fullName,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
        age: action.payload.age,
      }
    }
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
