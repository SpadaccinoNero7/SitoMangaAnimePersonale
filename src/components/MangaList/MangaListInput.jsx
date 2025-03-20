import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function MangaListInput() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [error, setError] = useState(null);
  const [checkCompleted, setCheckCompleted] = useState(false);

  const handleCompleted = () => {
    setCheckCompleted(!checkCompleted);
  };

  const handleAdd = () => {
    if (!inputTitle.trim()) {
      setError("Il titolo non può essere vuoto.");
      return;
    } else if (!inputAuthor.trim()) {
      setError("L'autore deve essere aggiunto");
      return;
    }

    axios
      .post("http://localhost:8080/manga/manga", {
        id: 0,
        title: inputTitle,
        author: inputAuthor,
        completed: checkCompleted,
      })
      .then((res) => {
        setInputTitle("");
        setInputAuthor("");
        setCheckCompleted(false);
        setError("Aggiunto correttamente!");
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
        value={inputTitle}
        placeholder="Aggiungi il titolo..."
        onChange={(e) => setInputTitle(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={inputAuthor}
        placeholder="Aggiungi l'autore..."
        onChange={(e) => setInputAuthor(e.target.value)}
        className="p-2 border rounded"
      />
      {checkCompleted && (
        <CheckBoxIcon
          className="cursor-pointer ml-2"
          onClick={handleCompleted}
        />
      )}
      {!checkCompleted && (
        <CheckBoxOutlineBlankIcon
          className="cursor-pointer ml-2"
          onClick={handleCompleted}
        />
      )}
      <AddIcon onClick={handleAdd} className="cursor-pointer ml-2" />
      {error && <p className="text-white">{error}</p>}
    </div>
  );
}
