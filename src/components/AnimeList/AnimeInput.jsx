import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BlockIcon from "@mui/icons-material/Block";
import "./HoverTextCheckbox.css";

export default function AnimeInput() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCompleted = () => {
    setCheckCompleted(!checkCompleted);
  };

  const handleValidation = () => {
    if (input) {
      setIsValid(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleValidation();
  }, [input]);

  const handleAdd = () => {
    if (!input.trim()) {
      setError("Il titolo non può essere vuoto.");
      return;
    }

    axios
      .post("http://localhost:8080/anime/anime", {
        id: 0,
        title: input,
        completed: checkCompleted,
      })
      .then((res) => {
        setInput("");
        setCheckCompleted(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore durante l'aggiunta dell'anime.");
      });
  };

  return (
    <div className="bg-red-400 p-4 flex items-center justify-around">
      <input
        type="text"
        value={input}
        placeholder="Aggiungi il titolo..."
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded"
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
    </div>
  );
}
