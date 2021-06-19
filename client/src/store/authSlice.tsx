import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: false,
    reducers: {
        logIn: () => {
            return true
        },
        logOut: () => {
            return false
        }
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
