import { configureStore } from "@reduxjs/toolkit";
import playlistTracksReducer from "./utils/playlistTracks";
import likedTracksReducer from "./utils/likedTracks";
import tracksReducer from "./utils/tracks";

export default configureStore({
  reducer: {
    playlistTracks: playlistTracksReducer,
    likedTracks: likedTracksReducer,
    tracks: tracksReducer
  }
});

