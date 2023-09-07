import React, { useState, useEffect, useRef } from "react";
import Player from "./Player/Player";
import Browse from "./Player/Browse";
import { Button } from "./Player/Button";

function Main(props) {
  const { token, setToken } = props;
  const [showPlayer, setShowPlayer] = useState(true);

  const handleToggleStyle = () => {
    setShowPlayer(!showPlayer);
  };

  return (
    <>
      <Button
        title={showPlayer ? "Browse" : "Random"}
        onClick={handleToggleStyle}
      />
      {showPlayer ? (
        <Player token={token} setToken={setToken} />
      ) : (
        <Browse token={token} setToken={setToken} />
      )}
    </>
  );
}

export default Main;
