import { createSlice } from "@reduxjs/toolkit";

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState: {
    value: [],
  },
  reducers: {
    addTracks: (state, action) => {
      state.value.push(...action.payload);
    },
    replaceInitialState: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { addTracks, replaceInitialState } = tracksSlice.actions;

export default tracksSlice.reducer;