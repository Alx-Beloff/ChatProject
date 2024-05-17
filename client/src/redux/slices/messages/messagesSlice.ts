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
    setMessages: (state, action: PayloadAction<MessageType | MessageType[]>) => {
      if (Array.isArray(action.payload)) {
        state.messages = [...action.payload];
      } else {
        state.messages = [...state.messages, action.payload];
      }
    },
    setUsers: (state, action: PayloadAction<UserType>) => {
      const existingUserIndex = state.users.findIndex((el) => el.id === action.payload.id);

      if (existingUserIndex === -1) {
        state.users = [action.payload, ...state.users];
      } else {
        state.users[existingUserIndex] = action.payload;
      }
    },
  },
});

export const { setMessages, setUsers } = messageSlice.actions;

export default messageSlice.reducer;
