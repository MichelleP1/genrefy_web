import Player from "./Player/Player";

function Main(props) {
  const { token, setToken } = props;

  return (
    <>
      <Player token={token} setToken={setToken} />
    </>
  );
}

export default Main;
