import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SnackBar from "../infoComponents/SnackBarComponent";
import { putAnimeAsync } from "./animeSlice";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

export default function AnimePutGrande({ anime, handleClose, open }) {
  const [newOpen, setNewOpen] = useState(open);
  const [input, setInput] = useState(anime.title);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(anime.completed);
  const dispatch = useDispatch();

  const handleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const handleCancel = () => {
    setNewOpen(false);
    setOpenCancel(true);
  };

  const handleChange = () => {
    if (input === anime.title && isCompleted === anime.completed) {
      setNewOpen(false);
      setOpenWarning(true);
      return;
    }

    if (input) {
      dispatch(
        putAnimeAsync({
          id: anime.id,
          title: input,
          completed: isCompleted,
        })
      );
      setNewOpen(false);
      setOpenSuccess(true);
    } else {
      setNewOpen(false);
      setOpenFailed(true);
    }
  };

  return (
    <>
      <Dialog open={newOpen} onClose={handleClose}>
        <DialogTitle>
          Modifica di <strong>{anime.title}</strong> in corso...
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Inserisci il nuovo titolo</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {!anime.completed && (
            <>
              Segna come completata
              {isCompleted ? (
                <CheckBox onClick={handleCompleted} />
              ) : (
                <CheckBoxOutlineBlank onClick={handleCompleted} />
              )}
            </>
          )}
          {anime.completed && (
            <>
              Lascia vuoto per segnarla come non completata
              {!isCompleted ? (
                <CheckBoxOutlineBlank onClick={handleCompleted} />
              ) : (
                <CheckBox onClick={handleCompleted} />
              )}
            </>
          )}
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
