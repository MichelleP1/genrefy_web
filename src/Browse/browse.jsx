import React, { useState, useEffect } from "react";
import "./browse.scss";

function Browse(props) {
  const [showDropDown, setShowDropdown] = useState(false);

  const toggleDropDown = () => {
    setShowDropdown(!showDropDown);
  };

  return (
    <div className="App">
      <div className="container">
        <button type="button" className="button" onClick={toggleDropDown}>
          ☰
        </button>
        {showDropDown && (
          <div class="dropdown">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
