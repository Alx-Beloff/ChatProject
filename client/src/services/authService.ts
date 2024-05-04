import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { AuthStateType, UserLoginType, UserSignUpType } from '../types/userTypes';
import authInstance from './apiInstance';

class AuthService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async refresh(): Promise<AuthStateType> {
    const { data } = await this.apiInstance<AuthStateType>('/tokens/refresh');
    return data;
  }

  async check(): Promise<AuthStateType> {
    const { data } = await this.apiInstance<AuthStateType>('/auth/check');
    return data;
  }

  async signUp(formData: UserSignUpType): Promise<AuthStateType> {
    try {
      const { data } = await this.apiInstance.post<AuthStateType>('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      throw new Error(err.response?.data.message);
    }
  }

  async login(formData: UserLoginType): Promise<AuthStateType> {
    try {
      const { data } = await this.apiInstance.post<AuthStateType>('/auth/login', formData);
      return data;
    } catch (error) {
      const err = error as AxiosError<Error>;
      throw new Error(err.response?.data.message);
    }
  }

  async logout(): Promise<AxiosResponse> {
    return this.apiInstance('/auth/logout');
  }
}

export default new AuthService(authInstance);
