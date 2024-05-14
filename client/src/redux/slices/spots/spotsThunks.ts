import { createAsyncThunk } from '@reduxjs/toolkit';
import spotsService from '../../../services/spotsService';
import type { SpotFormType, SpotType } from '../../../types/spotType';
import type { MessageType } from '../../../types/messageType';

export const getSpotsThunk = createAsyncThunk<SpotType[]>('/spots', async () => {
  const data = await spotsService.getSpots();
  return data;
});

export const addSpotThunk = createAsyncThunk<SpotType, SpotFormType>(
  '/spots/add',
  async (formData) => {
    const data = await spotsService.addSpot(formData);
    return data;
  },
);

export const getMessagesThunk = createAsyncThunk<MessageType[]>('/getUserMessages', async () => {
  const data = await spotsService.getUserMessages();
  return data;
});