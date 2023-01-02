import React, { useState, useEffect, useRef } from "react";
import { genres } from "../genres";
import { FaPlay, FaPause } from "react-icons/fa";
import { Inactive } from "./Inactive";
import { Button } from "./Button";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";
import "./player.scss";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function Player(props) {
  const { token, setToken } = props;
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(true);
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [genre, setGenre] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const deviceID = useRef("");
  const position = useRef(0);
  const currentTrackName = useRef("");
  const urlScript = "https://sdk.scdn.co/spotify-player.js";
  const urlPrefix = "https://api.spotify.com/v1/";
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    setSpotifyPlayer();
  }, []);

  const setSpotifyPlayer = () => {
    const script = document.createElement("script");
    script.src = urlScript;
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        deviceID.current = device_id;
        handleChangeGenre();
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        if (
          state.track_window.current_track.name !== currentTrackName.current
        ) {
          position.current = 0;
        }
        setLoaded(true);
        setCurrentTrack(state.track_window.current_track);
        currentTrackName.current = state.track_window.current_track.name;
        console.log(currentTrackName.current);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      const connection = await player.connect();
      if (!connection) {
        setToken("");
        alert("Your session has expired - please sign in again");
      }
    };
  };

  const querySpotify = async (url) => {
    return await axios.get(url, {
      params: { limit: 50, offset: 0 },
      headers,
    });
  };

  const getNewGenrePlaylist = async (genre) => {
    const genrePlaylist = await querySpotify(
      `${urlPrefix}search?q=sound of ${genre}&type=playlist&limit=10`
    );
    const playlists = genrePlaylist?.data?.playlists?.items;
    setPlaylists(playlists);
    setGenre(genre);
    return playlists[0];
  };

  const getCurrentGenreNextPlaylist = () => {
    const index = playlists.findIndex((x) => x.name === playlist.name) + 1 || 0;
    return playlists?.[index];
  };

  const handleChangeGenre = async () => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    handleChangePlaylist(null, randomGenre);
  };

  const handleChangePlaylist = async (_, newGenre = null) => {
    const newPlaylist = newGenre
      ? await getNewGenrePlaylist(newGenre)
      : getCurrentGenreNextPlaylist();
    setPlaylist(newPlaylist);
    const playlistReturn = await querySpotify(newPlaylist.tracks.href);
    const tracks = playlistReturn.data.items;
    const uris = tracks.map((track) => `spotify:track:${track.track.id}`);
    const urlPlayer = `${urlPrefix}me/player/play?device_id=${deviceID.current}`;
    axios.put(urlPlayer, { uris }, { headers });
  };

  const handlePlay = () => {
    player.togglePlay();
  };

  const handleNext = () => {
    player.nextTrack();
  };

  const handlePrevious = () => {
    player.previousTrack();
  };

  const handleRewind = () => {
    const positionChange = position.current - 15 * 1000;
    position.current = positionChange >= 0 ? positionChange : 0;
    player.seek(position.current);
  };

  const handleFastForward = () => {
    position.current += 15 * 1000;
    player.seek(position.current);
  };

  return active ? (
    loaded ? (
      <div className="main">
        <h3 className="genre">{genre}</h3>
        <h5 className="playlist">{playlist.name}</h5>
        <img className="album-image" src={currentTrack.album.images[0].url} />
        <h5 className="track">
          {currentTrackName.current} - {currentTrack.artists[0].name}
        </h5>
        <div>
          <div className="player-controls">
            <Button title="<<<" onClick={handleRewind} />
            <Button title="<<" onClick={handlePrevious} />
            <Button
              title={paused ? <FaPlay /> : <FaPause />}
              onClick={handlePlay}
            />
            <Button title=">>" onClick={handleNext} />
            <Button title=">>>" onClick={handleFastForward} />
          </div>
          <div className="genre-playlist-controls">
            <Button title="Change Genre" onClick={handleChangeGenre} />
            <Button title="Change Playlist" onClick={handleChangePlaylist} />
          </div>
        </div>
      </div>
    ) : (
      <LoadingSpinner />
    )
  ) : (
    <Inactive />
  );
}

export default Player;
