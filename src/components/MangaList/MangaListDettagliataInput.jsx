import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import "../AnimeList/HoverTextCheckbox.css";
import { useDispatch } from "react-redux";
import {
  addMangaDettaglioAsync,
  getMangaDettaglioAsync,
} from "./mangaDettaglioSlice";
import SnackBar from "../infoComponents/SnackBarComponent";
import ChooseVolumes from "./ChooseVolumes";

export default function MangaListDettagliataInput({ manga }) {
  const volume = useRef();
  const [inputPrice, setInputPrice] = useState(0);
  const [inputDate, setInputDate] = useState(dayjs());
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleValidation = () => {
    if (inputPrice) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [inputPrice]);

  const handleAdd = () => {
    setError(null);
    dispatch(
      addMangaDettaglioAsync({
        id: manga.id,
        volumes: Number(volume.current),
        date: inputDate.format("YYYY-MM-DD"),
        price: Number(inputPrice),
      })
    );
    dispatch(getMangaDettaglioAsync(manga.id));
    setOpen(true);
    setInputDate(dayjs());
    setInputPrice(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="bg-red-400 ml-5 p-4">
      <ChooseVolumes
        values={manga?.refExtId}
        handleAccept={(newValue) => {
          volume.current = newValue;
          console.log("Volume selezionato:", newValue);
        }}
      />
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Scegli la data"
          format="YYYY/M/D"
          value={inputDate}
          onChange={(newValue) => setInputDate(newValue)}
        />
      </LocalizationProvider>
      <p>Prezzo (€)</p>
      <input
        type="number"
        min={0}
        step={0.1}
        value={inputPrice}
        onChange={(e) => setInputPrice(Number(e.target.value))}
        className="p-2 border rounded"
      />
      <div className="tooltip">
        {isValid ? (
          <AddIcon onClick={handleAdd} className="cursor-pointer ml-2" />
        ) : (
          <BlockIcon className="ml-2" />
        )}
        <span className="tooltip-text">
          {isValid
            ? "Aggiungi alla lista!"
            : "Inserisci il prezzo per aggiungere il volume"}
        </span>
      </div>
      {error && <p className="text-white">{error}</p>}
      <SnackBar
        close={handleClose}
        duration={3000}
        open={open}
        severity={"success"}
        text={"Aggiunto con successo!"}
      />
    </div>
  );
}
