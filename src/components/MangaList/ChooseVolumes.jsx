import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import { useFetch } from "../customHooks/useFetch";

export default function ChooseVolumes({ values, handleAccept }) {
  const value = useRef();

  const mangaVolumes = useFetch(
    `https://api.jikan.moe/v4/manga/${values}/full`
  );

  const handleChange = (event) => {
    value.current = event.target.value;
    console.log(event.target.value);
    handleAccept(value.current);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Scegli il volume</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          {Array.from(
            { length: mangaVolumes.data?.data?.volumes || 0 },
            (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                Volume {index + 1}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
