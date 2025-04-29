import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeList from "./components/AnimeList/AnimeList.jsx";
import MangaList from "./components/MangaList/MangaList.jsx";
import MangaListDettagliata from "./components/MangaList/MangaListDettagliata.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import DettaglioManga from "./components/DettaglioManga.jsx";
import AnimeDettaglio from "./components/AnimeList/AnimeDettaglio.jsx";
import DettaglioAnime from "./components/DettaglioAnime.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="animeList" element={<AnimeList />} />
        <Route path="singleAnime/:animeId" element={<AnimeDettaglio />} />
        <Route path="mangaList" element={<MangaList />}></Route>
        <Route path="singleManga/:mangaId" element={<MangaListDettagliata />} />
        <Route path="dettaglioManga/:mal_id" element={<DettaglioManga />} />
        <Route path="dettaglioAnime/:mal_id" element={<DettaglioAnime />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
