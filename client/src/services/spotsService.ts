import type { AxiosInstance } from 'axios';
import type { SpotType } from '../types/spotType';
import axiosInstance from './apiInstance';

class SpotsService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  async getSpots(): Promise<SpotType[]> {
    const { data } = await this.apiInstance.get<SpotType[]>('/spots');
    return data;
  }
}

export default new SpotsService(axiosInstance);
