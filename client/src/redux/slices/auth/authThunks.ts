import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import AuthService from '../../../services/authService';
import type { AuthStateType, UserLoginType, UserSignUpType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<AuthStateType>('auth/checkUser', async () => {
  const data = await AuthService.check();
  return data;
});

export const loginThunk = createAsyncThunk<AuthStateType, UserLoginType>(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const data = await AuthService.login(formData);
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const signUpThunk = createAsyncThunk<AuthStateType, UserSignUpType>(
  'auth/signup',
  async (formData, thunkApi) => {
    try {
      const data = await AuthService.signUp(formData);
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>; 
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await AuthService.logout();
  } catch (error) {
    const err = error as AxiosError<Error>;
    return thunkApi.rejectWithValue(err.message);
  }
  return [];
});
