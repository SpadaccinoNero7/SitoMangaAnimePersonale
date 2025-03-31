import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import "../AnimeList/HoverTextCheckbox.css";
import { useDispatch } from "react-redux";
import { addMangaDettaglioAsync } from "./mangaDettaglioSlice";

export default function MangaListDettagliataInput({ manga }) {
  const [inputVolumes, setInputVolumes] = useState(1);
  const [inputPrice, setInputPrice] = useState(0);
  const [inputDate, setInputDate] = useState(dayjs());
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const handleValidation = () => {
    if (inputVolumes && inputPrice) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [inputVolumes, inputPrice]);

  const handleAdd = () => {
    if (!inputVolumes) {
      setError("Numero del volume necessario!");
      return;
    } else if (!inputPrice) {
      setError("Prezzo necessario!");
      return;
    }
    setError(null);
    dispatch(
      addMangaDettaglioAsync({
        id: manga.id,
        volumes: Number(inputVolumes),
        date: inputDate.format("YYYY-MM-DD"),
        price: Number(inputPrice),
      })
    );
    setError("Aggiunta effettuata");
    setInputDate(dayjs());
    setInputPrice(0);
    setInputVolumes(1);
  };

  return (
    <div className="bg-red-400 ml-5 p-4">
      <p>Volume</p>
      <input
        type="number"
        min={1}
        value={inputVolumes}
        onChange={(e) => setInputVolumes(e.target.value)}
        className="p-2 border rounded"
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
      <p>Prezzo</p>
      <input
        type="number"
        min={0}
        value={inputPrice}
        onChange={(e) => setInputPrice(e.target.value)}
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
            : "Scrivi qualcosa per aggiungere..."}
        </span>
      </div>
      {error && <p className="text-white">{error}</p>}
    </div>
  );
}
