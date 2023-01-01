import React, { useState, useEffect } from "react";
import { genres } from "./genres";
import axios from "axios";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function Player(props) {
  const genresArray = genres.map((data) => {
    return <p>{data}</p>;
  });

  return (
    <>
      <div>{genresArray}</div>
    </>
  );
}

export default Player;
