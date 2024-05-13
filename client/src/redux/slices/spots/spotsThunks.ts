import { createAsyncThunk } from '@reduxjs/toolkit';
import spotsService from '../../../services/spotsService';
import type { SpotType } from '../../../types/spotType';

const getSpotsThunk = createAsyncThunk<SpotType[]>('/spots', async () => {
  const data = await spotsService.getSpots();
  return data;
});

export default getSpotsThunk;
