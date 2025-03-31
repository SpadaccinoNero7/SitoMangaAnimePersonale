import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BlockIcon from "@mui/icons-material/Block";
import "./HoverTextCheckbox.css";
import { useDispatch } from "react-redux";
import { addAnimeAsync } from "./animeSlice";
import SnackBar from "../../infoComponents/SnackBarComponent";

export default function AnimeInput() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const dispatch = useDispatch();

  const handleCompleted = () => {
    setCheckCompleted(!checkCompleted);
  };

  /* const handleValidation = () => {
    if (input) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [input]); */

  const handleAdd = () => {
    if (!input.trim()) {
      setOpenWarning(true);
      return;
    }
    setError(null);
    dispatch(
      addAnimeAsync({
        title: input.trim(),
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
  };

  return (
    <div className="bg-red-400 p-4 flex items-center justify-around">
      {/* <input
        type="text"
        value={input}
        placeholder="Aggiungi il titolo..."
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded"
      /> */}
      <TextField
        label="Titolo"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
      {error && <p className="text-red-600 mt-2">{error}</p>}
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
        severity={"warning"}
        text={"Il titolo non può essere vuoto!"}
      />
    </div>
  );
}
