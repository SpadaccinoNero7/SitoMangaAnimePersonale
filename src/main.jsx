import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeList from "./components/AnimeList/AnimeList.jsx";
import MangaList from "./components/MangaList/MangaList.jsx";
import MangaListDettagliata from "./components/MangaList/MangaListDettagliata.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Test from "./components/test.jsx";
import TestDettaglio from "./components/TestDettaglio.jsx";
import AnimeDettaglio from "./components/AnimeList/AnimeDettaglio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />} />
          <Route path="animeList" element={<AnimeList />} />
          <Route path="singleAnime/:animeId" element={<AnimeDettaglio />} />
          <Route path="mangaList" element={<MangaList />}></Route>
          <Route
            path="singleManga/:mangaId"
            element={<MangaListDettagliata />}
          />
          <Route path="test" element={<Test />}>
            <Route path=":mal_id" element={<TestDettaglio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
