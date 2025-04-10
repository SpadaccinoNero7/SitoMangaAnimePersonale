import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BlockIcon from "@mui/icons-material/Block";
import "./HoverTextCheckbox.css";
import { useDispatch, useSelector } from "react-redux";
import { addAnimeAsync, setSelectedAnimeId } from "./animeSlice";
import SnackBar from "../infoComponents/SnackBarComponent";
import { Autocomplete } from "@mui/material";
import { useFetch } from "../customHooks/useFetch";

export default function AnimeInput() {
  const [input, setInput] = useState("");
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openWarningSameTitle, setOpenWarningSameTitle] = useState(false);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useFetch(
    `https://api.jikan.moe/v4/anime?page=${currentPage}&q=${searchQuery}`
  );

  const animeTotal = useSelector((state) => state.anime.data);

  const x = animeTotal.map((el) => el.title);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event, value) => {
    if (value.length > 3) {
      setSearchQuery(value);
    } else {
      return;
    }
  };

  const handleSelectChange = (event, value) => {
    if (value) {
      setInput(value);
      dispatch(setSelectedAnimeId(value.mal_id));
    }
  };

  useEffect(() => {}, [currentPage, searchQuery]);

  const handleCompleted = () => {
    setCheckCompleted(!checkCompleted);
  };

  const handleAdd = () => {
    if (!input || typeof input !== "object") {
      setOpenWarning(true);
      return;
    }
    const animeTitle = input.title_english || input.title || "";
    if (!animeTitle) {
      setOpenWarning(true);
      return;
    }
    if (x.find((el) => el === animeTitle)) {
      setOpenWarningSameTitle(true);
      setInput("");
      return;
    }
    dispatch(
      addAnimeAsync({
        title: animeTitle,
        completed: checkCompleted,
      })
    );
    setInput("");
    setCheckCompleted(false);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenWarning(false);
    setOpenWarningSameTitle(false);
  };

  return (
    <div className="bg-red-400 p-4 flex items-center justify-around w-100">
      <Autocomplete
        freeSolo
        options={data.data}
        getOptionLabel={(option) => option.title_english || option.title || ""}
        onInputChange={handleSearchChange}
        onChange={handleSelectChange}
        value={input}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Cerca Anime" />}
        renderOption={(props, option) => (
          <li {...props} key={option.mal_id}>
            <strong>{option.title_english || option.title}</strong> (
            {option.mal_id})
          </li>
        )}
      />
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
      <SnackBar
        open={open}
        duration={5000}
        close={handleClose}
        severity={"success"}
        text={"Aggiunto con successo!"}
      />
      <SnackBar
        open={openWarning}
        duration={5000}
        close={handleClose}
        severity={"error"}
        text={"Il titolo non può essere vuoto!"}
      />
      <SnackBar
        open={openWarningSameTitle}
        duration={5000}
        close={handleClose}
        severity={"warning"}
        text={"Hai già inserito il titolo scelto!"}
      />
    </div>
  );
}
