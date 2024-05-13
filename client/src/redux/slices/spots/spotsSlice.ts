import { createSlice } from '@reduxjs/toolkit';
import type { SpotType } from '../../../types/spotType';
import getSpotsThunk from './spotsThunks';

type SpotsState = SpotType[];

const initialState: SpotsState = [];

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpotsThunk.fulfilled, (_, action) => action.payload);
  },
});

export default spotsSlice.reducer;
