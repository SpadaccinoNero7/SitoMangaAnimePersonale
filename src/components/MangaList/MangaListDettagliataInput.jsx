import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BlockIcon from "@mui/icons-material/Block";
import "../AnimeList/HoverTextCheckbox.css";

export default function MangaListDettagliataInput({ manga }) {
  const [inputVolumes, setInputVolumes] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  console.log(manga);

  const handleValidation = () => {
    if (inputVolumes && inputPrice) {
      setIsValid(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleValidation();
  }, [inputVolumes, inputPrice]);

  const handleAdd = () => {
    if (!inputVolumes.trim()) {
      setError("Il titolo non può essere vuoto.");
      return;
    } else if (!inputPrice.trim()) {
      setError("L'autore deve essere aggiunto");
      return;
    }

    axios
      .post(`http://localhost:8080/detailsManga/manga/${manga.id}/details`, {
        id: 0,
        volumes: inputVolumes,
        date: "2025-03-20",
        price: inputPrice,
      })
      .then((res) => {
        setInputVolumes("");
        setInputPrice("");
        setError("Aggiunto correttamente!");
      })
      .catch((err) => {
        console.error(err);
        setError("Errore durante l'aggiunta dei dettagli.");
      });
  };

  return (
    <div className="bg-red-400 ml-5 p-4">
      <p>Volume</p>
      <input
        type="number"
        min={1}
        value={inputVolumes}
        placeholder="Aggiungi il volume..."
        onChange={(e) => setInputVolumes(e.target.value)}
        className="p-2 border rounded"
      />{" "}
      <p>Prezzo</p>
      <input
        type="number"
        min={0}
        value={inputPrice}
        placeholder="Aggiungi il prezzo..."
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
