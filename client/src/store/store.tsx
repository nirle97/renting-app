import { configureStore  } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { combineReducers, Store } from '@reduxjs/toolkit'
import { createStore } from "redux"
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  authReducer,
  userReducer
})
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const persisStore = () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
 const store: Store = configureStore({
  reducer: {
    rootReducer,
  },
});


export default store