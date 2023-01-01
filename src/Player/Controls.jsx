export function Controls() {
  return (
    <div>
      <button
        className="btn-spotify"
        onClick={() => {
          player.previousTrack();
        }}
      >
        &lt;&lt;
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          player.togglePlay();
        }}
      >
        {is_paused ? <FaPlay /> : <FaPause />}
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          player.nextTrack();
        }}
      >
        &gt;&gt;
      </button>
      <button className="btn-spotify" onClick={handleChangeGenre}>
        Change Genre
      </button>
      <button className="btn-spotify" onClick={handleChangePlaylist}>
        Change Playlist
      </button>
    </div>
  );
}
