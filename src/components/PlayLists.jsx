import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getAllPlaylists, getSongsFromPlaylist } from "../utils/PlaylistUtils";
import SongList from "./SongList";
import "./favourites.css";
import "./PlayLists.css";

const Playlists = ({
  handleMainPlay,
  currentSongIndex,
  isPlaying,
  audioRefs,
}) => {
  const [fetchedPlaylists, setFetchedPlaylists] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedPlaylistName, setSelectedPlaylistName] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const data = await getAllPlaylists(user.uid);
        setFetchedPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = async (playlistName) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const songs = await getSongsFromPlaylist(user.uid, playlistName);
      setSelectedSongs(songs);
      setSelectedPlaylistName(playlistName);
    } catch (error) {
      console.error("Error fetching songs from playlist:", error);
    }
  };

  return (
    <div className="favourites-container">
      <h2 className="favourites-title">Your Playlists</h2>
<div className="playlist-buttons-grid">
  {fetchedPlaylists.length === 0 && <p>No playlists found.</p>}
  {fetchedPlaylists.map((playlist) => (
    <div
      key={playlist.name}
      onClick={() => handlePlaylistClick(playlist.name)}
      className="playlist-card"
    >
      🎵 {playlist.name}
    </div>
  ))}
</div>


      {selectedPlaylistName && (
        <>
          <h3 className="favourites-subtitle">{selectedPlaylistName}</h3>
          <SongList
            songs={selectedSongs}
            likedSongs={{}}
            toggleLike={() => {}}
            handleMainPlay={(index) => handleMainPlay(index, selectedSongs)}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            audioRefs={audioRefs}
          />
        </>
      )}
    </div>
  );
};

export default Playlists;