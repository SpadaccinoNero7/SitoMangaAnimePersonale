import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function AnimeInput() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);

  const handleCompleted = () => {
    setCheckCompleted(!checkCompleted);
  };

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
        console.log(res.data);
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
    <div className="bg-red-400 w-fit p-4">
      <input
        type="text"
        value={input}
        placeholder="Aggiungi il titolo..."
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded"
      />
      {checkCompleted && <CheckBoxIcon onClick={handleCompleted} />}
      {!checkCompleted && (
        <CheckBoxOutlineBlankIcon onClick={handleCompleted} />
      )}
      <AddIcon onClick={handleAdd} className="cursor-pointer ml-2" />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
