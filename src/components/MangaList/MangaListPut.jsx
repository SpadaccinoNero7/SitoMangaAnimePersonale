import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putMangaAsync } from "./mangaSlice";
import { TextField } from "@mui/material";

export default function MangaListPut({ manga }) {
  const [value, setValue] = useState(manga.title || "");
  const dispatch = useDispatch();

  const handleChange = () => {
    if (value) {
      dispatch(
        putMangaAsync({
          id: manga.id,
          title: value.trim(),
          author: manga.author,
          completed: manga.completed,
        })
      );
    }
  };
  return (
    <>
      <TextField
        label="Titolo"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleChange}>Salva</button>
    </>
  );
}
