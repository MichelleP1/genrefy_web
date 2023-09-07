import React, { useState, useEffect } from "react";
import Player from "./Player/Player";
import Browse from "./Player/Browse";
import Login from "./Login";
import Main from "./Main";
import "./App.scss";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const response = await fetch("/auth/token");
    const { access_token } = await response.json();
    setToken(access_token);
  };

  // return token ? <Player token={token} setToken={setToken} /> : <Login />;
  return token ? <Main token={token} setToken={setToken} /> : <Login />;
}

export default App;

// Funkgerät
// Kosmodrom
// k forest
// canadian contempary rnb
// The Sound of Sacramento Indie
