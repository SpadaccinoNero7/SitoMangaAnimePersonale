import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import DeleteConfirm from "../infoComponents/DeleteConfirm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteMangaDettaglioAsync } from "./mangaDettaglioSlice";

export default function MangaDettaglioPut({
  manga,
  open,
  handleClose,
  handleAccept,
}) {
  const [newDate, setNewDate] = useState(
    dayjs(manga.date).isValid() ? dayjs(manga.date) : dayjs()
  );
  const [newPrice, setNewPrice] = useState(manga.price);
  const dispatch = useDispatch();
  const [newOpen, setNewOpen] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteMangaDettaglioAsync(id));
  };

  const handleCloseNew = () => {
    setNewOpen(null);
  };

  const handleOpen = (id) => {
    setNewOpen(id);
  };

  /* siacbai */
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Stai modificando il volume {manga.volumes}</DialogTitle>
        <DialogContent>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Scegli la nuova data"
              format="YYYY/M/D"
              value={newDate}
              onChange={(newValue) => {
                if (dayjs(newValue).isValid()) {
                  setNewDate(newValue);
                }
              }}
            />
          </LocalizationProvider>
          <p>Prezzo</p>
          <input
            type="number"
            min={1}
            step={0.1}
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="p-2 border rounded"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={() => handleAccept(newDate, newPrice)}>
            Conferma
          </Button>
          <DeleteIcon
            onClick={() => handleOpen(manga.id)}
            style={{ cursor: "pointer" }}
          />
          {newOpen === manga.id && (
            <DeleteConfirm
              open={true}
              handleClose={handleCloseNew}
              value={manga}
              handleAccept={() => handleDelete(manga.id)}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
