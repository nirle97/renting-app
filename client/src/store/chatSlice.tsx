import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ChatSlice {
  currentChatRoom: string;
}
export const initialState: ChatSlice = {
  currentChatRoom: "",
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRoom: (state, { payload }: PayloadAction<ChatSlice>) => {
      state.currentChatRoom = payload.currentChatRoom;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { setChatRoom } = chatSlice.actions;
export const chatSelectors = (state: RootState) => state.chatReducer;
