import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../components/AnimeList/animeSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});
