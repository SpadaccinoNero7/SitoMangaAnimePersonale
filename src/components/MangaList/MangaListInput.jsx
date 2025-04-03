import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BlockIcon from "@mui/icons-material/Block";
import "../AnimeList/HoverTextCheckbox.css";
import { useDispatch } from "react-redux";
import { addMangaAsync } from "./mangaSlice";
import TextField from "@mui/material/TextField";
import SnackBar from "../infoComponents/SnackBarComponent";
import { useFetch } from "../customHooks/useFetch";
import { Autocomplete, Fade, Tooltip, Zoom } from "@mui/material";

export default function MangaListInput() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [error, setError] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Nuovo stato per il valore selezionato
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetch(
    `https://api.jikan.moe/v4/manga?page=${currentPage}&q=${searchQuery}`
  );

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event, value) => {
    setSearchQuery(value);
    /* if (value.length > 3) {
      setSearchQuery(value);
      console.log("searchQuery", searchQuery);
    } else {
      return;
    } */
  };

  const handleSelectChange = (event, value) => {
    setSelectedOption(value); // Aggiorna lo stato con l'opzione selezionata
    if (value) {
      setInputTitle(value.title_english || value.title || ""); // Aggiorna il titolo
      const oldAuthor = value?.authors?.[0]?.name || "";
      setInputAuthor(oldAuthor.replace(/,/g, "")); // Aggiorna l'autore
    } else {
      setInputTitle(""); // Resetta il titolo se non c'è una selezione
      setInputAuthor(""); // Resetta l'autore
    }
  };

  const handleCompleted = () => {
    setCheckCompleted(!checkCompleted);
  };

  const handleValidation = () => {
    if (inputTitle && inputAuthor) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [inputTitle, inputAuthor]);

  const handleAdd = () => {
    /* if (!inputTitle.trim()) {
      setError("Il titolo non può essere vuoto.");
      return;
    } else if (!inputAuthor.trim()) {
      setError("L'autore deve essere aggiunto");
      return;
    } */

    setError(null);
    dispatch(
      addMangaAsync({
        title: inputTitle,
        author: inputAuthor,
        completed: checkCompleted,
      })
    );
    setInputTitle("");
    setInputAuthor("");
    setCheckCompleted(false);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="bg-red-400 w-fit p-4">
      {/* <TextField
        label="Titolo"
        variant="outlined"
        placeholder="Inserisci il titolo"
        onChange={(e) => setInputTitle(e.target.value)}
        value={inputTitle}
        margin="dense"
      /> */}
      <Autocomplete
        autoHighlight
        openText="Apri"
        closeText="Chiudi"
        loading
        clearText="Cancella"
        loadingText="Ricerca in corso..."
        options={data.data}
        getOptionLabel={(option) => option.title_english || option.title || ""}
        onInputChange={handleSearchChange}
        onChange={handleSelectChange}
        value={selectedOption}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Cerca Manga" />}
        renderOption={(props, option) => (
          <li {...props} key={option.mal_id}>
            <strong>{option.title_english || option.title}</strong> (
            {option.mal_id})
          </li>
        )}
      />
      <br />
      <Tooltip
        title="L' autore viene aggiunto in automatico"
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "green",
              color: "white",
              padding: "5%",
              fontSize: "15px",
            },
          },
        }}
        slots={{
          transition: Zoom,
        }}
      >
        <TextField
          value={inputAuthor}
          readOnly
          placeholder="Autore"
          disabled
          sx={{
            backgroundColor: "white",
            color: "red",
          }}
        />
      </Tooltip>
      {/* <TextField
        value={inputAuthor}
        placeholder="L'autore viene aggiunto in automatico"
        readOnly
        multiline
        InputProps={{
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      /> */}
      {/* <TextField
        label="Autore"
        variant="outlined"
        placeholder="Inserisci l'autore"
        value={inputAuthor}
        margin="dense"
        onChange={(e) => setInputAuthor(e.target.value)}
      /> */}
      <div className="tooltip">
        {checkCompleted ? (
          <CheckBoxIcon
            onClick={handleCompleted}
            className="cursor-pointer text-white ml-2"
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            onClick={handleCompleted}
            className="cursor-pointer hover:text-white ml-2"
          />
        )}
        <span className="tooltip-text">
          {checkCompleted
            ? "Segna come non completato"
            : "Segna come completato"}
        </span>
      </div>
      <div className="tooltip">
        {isValid ? (
          <AddIcon onClick={handleAdd} className="cursor-pointer ml-2" />
        ) : (
          <BlockIcon className="ml-2" />
        )}
        <span className="tooltip-text">
          {isValid
            ? "Aggiungi alla lista!"
            : "Scrivi qualcosa per aggiungere..."}
        </span>
      </div>
      {error && <p className="text-white">{error}</p>}
      <SnackBar
        open={open}
        duration={3000}
        close={handleClose}
        severity={"success"}
        text={"Aggiunto con successo!"}
      />
    </div>
  );
}
