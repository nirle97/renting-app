import { configureStore  } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  authReducer
})

 const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export default store