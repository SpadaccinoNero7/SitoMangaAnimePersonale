import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BlockIcon from "@mui/icons-material/Block";
import "../AnimeList/HoverTextCheckbox.css";
import { useDispatch } from "react-redux";
import { addMangaAsync } from "./mangaSlice";
import TextField from "@mui/material/TextField";

export default function MangaListInput() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [error, setError] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

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
    if (!inputTitle.trim()) {
      setError("Il titolo non può essere vuoto.");
      return;
    } else if (!inputAuthor.trim()) {
      setError("L'autore deve essere aggiunto");
      return;
    }

    setError(null);
    dispatch(
      addMangaAsync({
        title: inputTitle.trim(),
        author: inputAuthor.trim(),
        completed: checkCompleted,
      })
    );
    setInputTitle("");
    setInputAuthor("");
    setCheckCompleted(false);
  };

  return (
    <div className="bg-red-400 w-fit p-4">
      {/*       <input
        type="text"
        value={inputTitle}
        placeholder="Aggiungi il titolo..."
        onChange={(e) => setInputTitle(e.target.value)}
        className="p-2 border rounded"
      /> */}
      <TextField
        label="Titolo"
        variant="outlined"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <TextField
        label="Autore"
        variant="outlined"
        value={inputAuthor}
        onChange={(e) => setInputAuthor(e.target.value)}
      />
      {/*       <input
        type="text"
        value={inputAuthor}
        placeholder="Aggiungi l'autore..."
        onChange={(e) => setInputAuthor(e.target.value)}
        className="p-2 border rounded"
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
    </div>
  );
}
