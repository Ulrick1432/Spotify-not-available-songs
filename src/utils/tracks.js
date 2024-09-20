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
  }
});

export const { addTracks } = tracksSlice.actions;

export default tracksSlice.reducer;