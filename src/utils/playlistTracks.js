import { createSlice } from "@reduxjs/toolkit";

export const playlistTracksSlice = createSlice({
  name: 'playlistTracks',
  initialState: {
    tracks: [],
  },
  reducers: {
    addTracks: (state, action) => {
      state.tracks.push(...action.payload);
    },
  }
});

export const { addTracks } = playlistTracksSlice.actions;

export default playlistTracksSlice.reducer;