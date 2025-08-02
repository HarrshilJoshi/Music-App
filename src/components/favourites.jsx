import React, { useEffect, useState } from "react";
import { getLikedSongs } from "../utils/likedSong.js";
import SongList from "./SongList.jsx";
import "./favourites.css";

const Favourites = ({
  songs,
  likedSongs,
  handleMainPlay,
  currentSongIndex,
  isPlaying,
  audioRefs,
  setSongs,
}) => {
  const [fetchedLikedSongs, setFetchedLikedSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await getLikedSongs();
      setFetchedLikedSongs(songs);
      console.log("favoruite songs :" ,songs);
      
    };
    fetchSongs();
  }, []);

  return (
    <div className="favourites-container">
      <h2 className="favourites-title">Your Liked Songs</h2>
      {/* <div className="favourites-grid"> */}
        <SongList
          songs={fetchedLikedSongs}
          likedSongs={{}} // Optional
          toggleLike={() => {}}
          handleMainPlay={(index) => handleMainPlay(index, fetchedLikedSongs)} // ⬅️ Updated
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          audioRefs={audioRefs}
        />

      {/* </div> */}
    </div>
  );
};

export default Favourites;
