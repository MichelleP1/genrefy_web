import React, { useState, useEffect } from "react";
import "./browse.scss";
import { genres } from "../genres";

function Browse({ onChangeGenre }) {
  const [showDropDown, setShowDropdown] = useState(false);

  const toggleDropDown = () => {
    setShowDropdown(!showDropDown);
  };

  const genresArray = genres.map((genre) => {
    return (
      <li key={genre} onClick={() => onChangeGenre(null, genre)}>
        {genre}
      </li>
    );
  });

  return (
    <div className="App">
      <div className="container">
        <button
          type="button"
          className="dropdown-button"
          onClick={toggleDropDown}
        >
          ☰
        </button>
        {showDropDown && (
          <div className="dropdown">
            <ul>{genresArray}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
