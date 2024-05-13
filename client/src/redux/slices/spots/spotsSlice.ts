import { createSlice } from '@reduxjs/toolkit';
import type { SpotType } from '../../../types/spotType';
import getSpotsThunk from './spotsThunks';

type SpotsState = {
  spots: SpotType[];
};

const initialState: SpotsState = {
  spots: [],
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpotsThunk.fulfilled, (state, action) => {
      state.spots = action.payload;
    });
  },
});

export default spotsSlice.reducer;
