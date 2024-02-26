import React, { useState, useEffect } from "react";
import "./browse.scss";
import { genres } from "../genres";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

function Browse({ onChangeGenre }) {
  //onChangeGenre(null, genre)}
  const [value, setValue] = useState(genres[0]);

  const setGenreValue = (event, newValue) => {
    setValue(newValue);
    onChangeGenre(null, newValue);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      value={value}
      onChange={(event, newValue) => {
        setGenreValue(event, newValue);
        // setValue(newValue);
      }}
      disableClearable
      options={genres}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Genres" />}
    />
  );
}

export default Browse;
