import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MessageType } from '../../../types/messageType';
import type { UserType } from '../../../types/userTypes';

type MessagesState = {
  messages: MessageType[];
  users: UserType[];
};

const initialState: MessagesState = {
  messages: [],
  users: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload];
    },
    setUsers: (state, action: PayloadAction<UserType>) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { setMessages, setUsers } = messageSlice.actions;

export default messageSlice.reducer;
