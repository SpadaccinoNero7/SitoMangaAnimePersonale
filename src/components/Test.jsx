import { useEffect, useState } from "react";
import Error from "./infoComponents/Error";
import Loading from "./infoComponents/Loading";
import { useFetch } from "./customHooks/useFetch";
import { Autocomplete, Button, Pagination, TextField } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Test() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la ricerca
  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime?page=${currentPage}&q=${searchQuery}` // Aggiunta query di ricerca
  );

  const handleChange = (event, value) => {
    setCurrentPage(value); // Cambia la pagina quando l'utente interagisce con la paginazione
  };

  const handleSearchChange = (event, value) => {
    setSearchQuery(value); // Aggiorna la query di ricerca direttamente quando l'utente scrive
  };

  const handleSelectChange = (event, value) => {
    if (value) {
      window.location.href = `/test/${value.mal_id}`; // Reindirizza all'anime selezionato
    }
  };

  useEffect(() => {}, [currentPage, searchQuery]); // Ricarica quando cambia la pagina o la ricerca

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex">
      <div>
        <Autocomplete
          freeSolo
          options={data.data}
          getOptionLabel={(option) =>
            option.title_english || option.title || ""
          }
          onInputChange={handleSearchChange} // Aggiungi il gestore per modificare la query di ricerca
          onChange={handleSelectChange} // Gestisce la selezione dell'anime
          renderInput={(params) => (
            <TextField {...params} label="Cerca Anime" fullWidth />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.mal_id}>
              <strong>{option.title_english || option.title}</strong>
            </li>
          )}
        />

        {/* Paginazione */}
        <br />
        <Pagination
          count={data.pagination.last_visible_page}
          showFirstButton
          showLastButton
          onChange={handleChange}
        />
      </div>
      <Outlet />
    </div>
  );
}
