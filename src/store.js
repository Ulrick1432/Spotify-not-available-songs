import { configureStore } from "@reduxjs/toolkit";
import playlistTracksReducer from "./utils/playlistTracks";

export default configureStore({
  reducer: {
    playlistTracks: playlistTracksReducer,
  }
});

