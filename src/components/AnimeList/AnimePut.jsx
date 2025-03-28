import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

export default function AnimePut({ anime }) {
  const [value, setValue] = useState(anime.title || "");
  const [isCompleted, setIsCompleted] = useState(anime.completed);

  const handleChange = () => {
    if (value) {
      axios
        .put("http://localhost:8080/anime/anime", {
          id: anime.id,
          title: value,
          completed: isCompleted,
        })
        .then((response) => {
          window.alert(`${anime.title} aggiornato`);
        })
        .catch((error) => {
          console.error("Error updating anime:", error);
        });
    }
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isCompleted && (
        <CheckBoxOutlineBlankIcon onClick={() => setIsCompleted(isCompleted)} />
      )}
      {""}
      <CheckIcon onClick={handleChange} />
    </>
  );
}
