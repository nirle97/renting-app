import { configureStore  } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { combineReducers, Store } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  authReducer
})

 const store: Store = configureStore({
  reducer: {
    rootReducer,
  },
});


export default store