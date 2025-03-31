import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { TextField } from "@mui/material";

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
      {/* <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}
      <TextField
        label="Modifica titolo in corso"
        /*         sx={{
          backgroundColor: "green",
          color: "white",
          fontSize: "1rem",
        }} */
        variant="standard"
        size="small"
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
