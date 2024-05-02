import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserStateType } from '../../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

export type UserState = {
  accessToken: string;
  user: UserStateType;
  error: string;
};
const initialState: UserState = {
  accessToken: '',
  user: { status: 'pending' },
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserThunk.pending, (state) => {
        state.accessToken = '';
        state.user = { status: 'pending' };
      })
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = { ...user, status: 'logged' };
      })
      .addCase(checkUserThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = { ...user, status: 'logged' };
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = { ...user, status: 'logged' };
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      });
  },
});

export const { setError } = authSlice.actions;

export default authSlice.reducer;
