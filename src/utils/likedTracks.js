import { createSlice } from "@reduxjs/toolkit";

export const likedTracksSlice = createSlice({
  name: 'likedTracks',
  initialState: {
    tracks: [],
  },
  reducers: {
    addTracks: (state, action) => {
      state.tracks.push(...action.payload);
    },
  }
});

export const { addTracks } = likedTracksSlice.actions;

export default likedTracksSlice.reducer;