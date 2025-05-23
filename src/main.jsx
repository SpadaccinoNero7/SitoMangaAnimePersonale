import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeList from "./components/AnimeList/AnimeList.jsx";
import MangaList from "./components/MangaList/MangaList.jsx";
import MangaListDettagliata from "./components/MangaList/MangaListDettagliata.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="animeList" element={<AnimeList />} />
        <Route path="mangaList" element={<MangaList />}></Route>
        <Route path="singleManga/:mangaId" element={<MangaListDettagliata />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
