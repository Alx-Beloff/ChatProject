import { createSlice } from '@reduxjs/toolkit';
import type { SpotType } from '../../../types/spotType';
import { addSpotThunk, getMessagesThunk, getSpotsThunk } from './spotsThunks';
import type { MessageType } from '../../../types/messageType';

type SpotsState = {
  spots: SpotType[];
  userMessages: MessageType[];
  filtredSpots: number[];
};

const initialState: SpotsState = {
  spots: [],
  userMessages: [],
  filtredSpots: [],
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpotsThunk.fulfilled, (state, action) => {
        state.spots = action.payload;
      })
      .addCase(addSpotThunk.fulfilled, (state, action) => {
        state.spots = [...state.spots, action.payload];
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.userMessages = action.payload;
        const spotsArr = state.userMessages.map((el) => el.spotId);
        const filterSpots = spotsArr.filter((el, id) => spotsArr.indexOf(el) === id);
        state.filtredSpots = filterSpots;
      });
  },
});

export default spotsSlice.reducer;
