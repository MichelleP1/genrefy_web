import React, { useState, useEffect } from "react";
import { genres } from "../genres";
import axios from "axios";

function Browse(props) {
  const genresArray = genres.map((data) => {
    return <p>{data}</p>;
  });

  return (
    <>
      <div>{genresArray}</div>
    </>
  );
}

export default Browse;
