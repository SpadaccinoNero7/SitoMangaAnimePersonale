import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useFetch } from "../customHooks/useFetch";

export default function ChooseAnime({ values }) {
  const [link, setLink] = useState();

  const mangaVolumes = useFetch(
    `https://api.jikan.moe/v4/manga/${values}/relations`
  );

  const handleChange = (event) => {
    const LINK = mangaVolumes?.data?.data
      ?.find((el) => el.relation === "Adaptation")
      .entry.find((el) => el.name === event.target.value).url;
    setLink(LINK);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Scegli l'adattamento
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          {mangaVolumes?.data?.data
            ?.find((el) => el.relation === "Adaptation")
            ?.entry?.map((entry) => (
              <MenuItem key={entry.mal_id} value={entry.name}>
                {entry.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {link && (
        <div className="flex justify-center">
          <a href={link} target="_blank">
            Clicca qui per le informazioni
          </a>
        </div>
      )}
    </Box>
  );
}
