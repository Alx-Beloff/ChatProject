import type { AxiosInstance } from 'axios';
import type { SpotType, SpotFormType } from '../types/spotType';
import axiosInstance from './apiInstance';
import type { MessageType } from '../types/messageType';

class SpotsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getSpots(): Promise<SpotType[]> {
    const { data } = await this.apiInstance.get<SpotType[]>('/spots');
    return data;
  }

  async addSpot(formData: SpotFormType): Promise<SpotType> {
    const response = await this.apiInstance.post<SpotType>('/spots/', formData);
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(new Error('Add Spot Error'));
  }

  async getUserMessages(): Promise<MessageType[]> {
    const { data } = await this.apiInstance.get<MessageType[]>('/spots/messages');
    return data;
  }
}

export default new SpotsService(axiosInstance);
