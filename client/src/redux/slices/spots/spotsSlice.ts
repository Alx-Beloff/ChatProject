import { createSlice } from '@reduxjs/toolkit';
import type { SpotType } from '../../../types/spotType';
import { addSpotThunk, getMessagesThunk, getSpotsThunk } from './spotsThunks';
import type { MessageType } from '../../../types/messageType';

type SpotsState = {
  spots: SpotType[];
  isModalOpen: boolean;
  showButton: boolean;
  userMessages: MessageType[];
  filtredSpots: number[];
};

const initialState: SpotsState = {
  spots: [],
  isModalOpen: false,
  showButton: false,
  userMessages: [],
  filtredSpots: [],
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    showButton: (state, action) => {
      state.showButton = action.payload;
    },
  },
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

export const { toggleModal, showButton } = spotsSlice.actions;

export default spotsSlice.reducer;
