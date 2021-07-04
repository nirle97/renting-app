import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ChatSlice {
  chatRoom: {
    id: string;
  };
}
export const initialState: ChatSlice = {
  chatRoom: {
    id: "string",
  },
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRoom: (state, { payload }: PayloadAction<ChatSlice>) => {
      state.chatRoom = payload.chatRoom;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { setChatRoom } = chatSlice.actions;
export const chatSelectors = (state: RootState) => state.chatReducer;
