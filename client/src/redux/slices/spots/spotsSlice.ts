import { createSlice } from '@reduxjs/toolkit';
import type { SpotType } from '../../../types/spotType';
import getSpotsThunk from './spotsThunks';

type SpotsState = {
  spots: SpotType[];
  isModalOpen: boolean;
  showButton: boolean;
};

const initialState: SpotsState = {
  spots: [],
  isModalOpen: false,
  showButton: false,
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
    builder.addCase(getSpotsThunk.fulfilled, (state, action) => {
      state.spots = action.payload;
    });
  },
});

export const { toggleModal, showButton } = spotsSlice.actions;

export default spotsSlice.reducer;
