import React, { useState, useEffect } from "react";
import Login from "./Login";
import Player from "./Player/Player";
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

  return (
    <div className="container">
      {token ? <Player token={token} setToken={setToken} /> : <Login />}
    </div>
  );
}

export default App;
