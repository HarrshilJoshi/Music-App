import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { auth } from "../firebase";
import {
  getAllPlaylists,
  addSongToPlaylist,
  createPlaylist,
} from "../utils/PlaylistUtils";
import "./Song-card.css";
import "./PlayLists.css";

const SongList = ({
  songs,
  likedSongs,
  toggleLike,
  handleMainPlay,
  currentSongIndex,
  isPlaying,
  audioRefs,
}) => {
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);

  // Load playlists on component mount
  useEffect(() => {
    const fetchPlaylists = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const data = await getAllPlaylists(userId);
       console.log("🎧 All playlists fetched:", data);
      setPlaylists(data);
    };
    fetchPlaylists();
  }, []);

  const openMenuForSong = (index, song) => {
    setSelectedSong(song);
    setShowMenuIndex(index === showMenuIndex ? null : index);
    setNewPlaylistName("");
  };

  const handleAddExisting = async (playlistId) => {
    const userId = auth.currentUser?.uid;
    if (!userId || !selectedSong) return;

    await addSongToPlaylist(userId, playlistId, selectedSong);
    alert(`✅ Added to playlist "${playlistId}"`);
    setShowMenuIndex(null);
  };

  const handleCreateAndAdd = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid || !newPlaylistName.trim() || !selectedSong) return;

    await createPlaylist(uid, newPlaylistName.trim(), selectedSong);
    alert(`✅ Created "${newPlaylistName}" and added song`);

    const updated = await getAllPlaylists(uid);
    setPlaylists(updated);
    setNewPlaylistName("");
    setShowMenuIndex(null);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "50px",
        padding: "40px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {songs.map((song, index) => (
        <div className="song-card" key={song.id || index}>
          <img src={song.image} alt={song.album} className="song-image" />
          <p className="song-album">{song.album || "Unknown Album"}</p>
          <p className="song-singer">{song.singers || "Unknown Singer"}</p>
          <p className="song-duration">
            {Math.floor(song.duration / 60)}:{(`0${song.duration % 60}`).slice(-2)}
          </p>
          <p className="song-plays">Plays: {song.play_count}</p>

          <audio
            ref={(el) => (audioRefs.current[index] = el)}
            src={song.media_url}
            style={{ display: "none" }}
          />

          <div className="controls-row">
            <div
              onClick={() => handleMainPlay(index)}
              className="play-button"
              title="Play"
            >
              <Play
                size={16}
                style={{
                  color:
                    currentSongIndex === index && isPlaying ? "#5227FF" : "white",
                }}
              />
            </div>

            <button
              onClick={() => toggleLike(song)}
              className="favorite-button"
              title="Favorite"
            >
              {likedSongs[song.media_url] ? "💜" : "🤍"}
            </button>

            <button
              onClick={() => openMenuForSong(index, song)}
              className="favorite-button"
              title="Add to Playlist"
            >
              ⋮
            </button>

            {showMenuIndex === index && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="existing-playlists-scroll">
                    {playlists.length === 0 ? (
                      <p>No playlists yet.</p>
                    ) : (
                      playlists.map((pl) => (
                        <button
                          key={pl.name}
                          onClick={() => handleAddExisting(pl.name)}
                          className="existing-playlist-btn"
                        >
                          🎵 {pl.name}
                        </button>
                      ))
                    )}
                  </div>

                  <h3>Create New Playlist</h3>
                  <input
                    type="text"
                    placeholder="New Playlist Name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <div className="modal-actions">
                    <button className="create" onClick={handleCreateAndAdd}>
                      ➕ Create & Add
                    </button>
                    <button
                      className="close"
                      onClick={() => setShowMenuIndex(null)}
                    >
                      ❌ Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <a
              href={song.media_url}
              download
              className="download-button"
              title="Download"
            >
              <svg
                className="download-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 16l4-4h-3V4h-2v8H8l4 4zM20 18v2H4v-2h16z" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
