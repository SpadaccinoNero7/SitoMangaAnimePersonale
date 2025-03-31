import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { TextField } from "@mui/material";
import SnackBar from "../../infoComponents/SnackBarComponent";

export default function AnimePut({ anime }) {
  const [value, setValue] = useState(anime.title || "");
  const [isCompleted, setIsCompleted] = useState(anime.completed);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const handleChange = () => {
    if (value) {
      axios
        .put("http://localhost:8080/anime/anime", {
          id: anime.id,
          title: value,
          completed: isCompleted,
        })
        .then((response) => {
          setOpenSuccess(true);
        })
        .catch((error) => {
          setOpenFailed(true);
        });
    }
    if (value === anime.title) {
      setOpenWarning(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenFailed(false);
    setOpenWarning(false);
  };

  return (
    <>
      <TextField
        label="Modifica titolo in corso"
        /*         sx={{
          backgroundColor: "green",
          color: "white",
          fontSize: "1rem",
        }} */
        variant="standard"
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isCompleted && (
        <CheckBoxOutlineBlankIcon onClick={() => setIsCompleted(isCompleted)} />
      )}
      {""}
      <CheckIcon onClick={handleChange} />
      <SnackBar
        open={openSuccess}
        duration={3000}
        close={handleClose}
        severity={"success"}
        text={"Aggiornato con successo!"}
      />
      <SnackBar
        open={openFailed}
        duration={3000}
        close={handleClose}
        severity={"error"}
        text={"Errore nell'aggiornamento"}
      />
      <SnackBar
        open={openWarning}
        duration={3000}
        close={handleClose}
        severity={"warning"}
        text={"Nome invariato, non modificato"}
      />
    </>
  );
}
