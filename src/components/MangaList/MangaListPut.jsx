import { useState } from "react";
import { useDispatch } from "react-redux";
import { putMangaAsync } from "./mangaSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SnackBar from "../infoComponents/SnackBarComponent";

export default function MangaListPut({ manga, open, handleClose }) {
  const [newOpen, setNewOpen] = useState(open);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [value, setValue] = useState(manga.completed ? "Yes" : "No");
  const dispatch = useDispatch();

  const handleCancel = () => {
    setNewOpen(false);
    setOpenCancel(true);
  };

  const handleChange = () => {
    const completedValue = value === "Yes" ? true : false;
    console.log(completedValue);
    if (completedValue === manga.completed) {
      setNewOpen(false);
      setOpenWarning(true);
      return;
    } else {
      dispatch(
        putMangaAsync({
          id: manga.id,
          title: manga.title,
          author: manga.author,
          completed: completedValue,
        })
      );
      setOpenSuccess(true);
    }
    setOpenFailed(true);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Dialog open={newOpen} onClose={handleClose}>
        <DialogTitle>Vuoi cambiare il valore per {manga.title} ?</DialogTitle>
        <DialogContent>
          <DialogContentText>Scegli cosa fare</DialogContentText>
          L'opera è stata completata?{" "}
          <RadioGroup row value={value} onChange={handleRadioChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Si" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Annulla</Button>
          <Button onClick={handleChange}>Conferma</Button>
        </DialogActions>
      </Dialog>
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
      <SnackBar
        open={openCancel}
        duration={3000}
        close={handleCancel}
        severity={"warning"}
        text={"Modifica nome annullato..."}
      />
    </>
  );
}
