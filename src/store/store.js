import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../components/AnimeList/animeSlice";
import mangaReducer from "../components/MangaList/mangaSlice";
import mangaDettaglioReducer from "../components/MangaList/mangaDettaglioSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    manga: mangaReducer,
    mangaDettaglio: mangaDettaglioReducer,
  },
});
