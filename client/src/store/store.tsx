import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
import { spinnerReducer } from "./spinnerSlice";
import { userReducer } from "./userSlice";
import { prefReducer } from "./prefSlice";
import { aptReducer } from "./aptSlice";
import { profileReducer } from "./profileSlice";
import { combineReducers, Store } from "@reduxjs/toolkit";
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  prefReducer,
  profileReducer,
  aptReducer,
  spinnerReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "userReducer",
    "authReducer",
    "prefReducer",
    "profileReducer",
    "aptReducer",
    "spinnerReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
