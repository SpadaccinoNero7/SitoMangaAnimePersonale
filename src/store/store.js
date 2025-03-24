import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../components/AnimeList/animeSlice";
import mangaReducer from "../components/MangaList/mangaSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    manga: mangaReducer,
  },
});
