// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import SongList from "./SongList";
import "./HomePage.css";

export default function HomePage({
  userId,
  songs,
  showSearchResults,
  setActiveTab, 
  likedSongs,
  toggleLike,
  handleMainPlay,
  currentSongIndex,
  isPlaying,
  audioRefs,
}) {
  const [topSongs, setTopSongs] = useState([]);
  const [latestSongs, setLatestSongs] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!userId) {
      console.warn("userId is undefined, skipping HomePage fetch");
      return;
    }

    if (!songs) {
      console.warn("songs from search are undefined, skipping song display");
      return;
    }

    const fetchData = async () => {
      try {
        // 🔥 Top Songs from API
        // const topSongsFromApi = [...songs]
        //   .sort((a, b) => (b.play_count || 0) - (a.play_count || 0))
        //   .slice(0, 10);
        // setTopSongs(topSongsFromApi);

        // // 🆕 Latest Songs from API
        // const latestSongsFromApi = [...songs]
        //   .sort(
        //     (a, b) =>
        //       new Date(b.release_date || 0).getTime() -
        //       new Date(a.release_date || 0).getTime()
        //   )
        //   .slice(0, 10);
        // setLatestSongs(latestSongsFromApi);

        // 🎤 Recommended Songs based on singers in likedSongs
        const likedSnap = await getDocs(collection(db, "users", userId, "likedSongs"));

        const singerSet = new Set();
        likedSnap.forEach((d) => {
          const data = d.data();
          const s = data.singers;
          if (s) {
            s.split(",").forEach((name) => singerSet.add(name.trim()));
          } else {
            console.warn("⚠️ No singers in liked song:", data);
          }
        });

        const recs = [];
        for (let singer of singerSet) {
          const snap = await getDocs(
            query(collection(db, "songs"), where("singers", "==", singer), limit(5))
          );
          snap.forEach((d) => {
            const song = { id: d.id, ...d.data() };
            if (!recs.find((r) => r.id === song.id)) recs.push(song);
          });
        }
        setRecommended(recs);

        // ❤️ Favourites
        setFavourites(likedSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // 📁 Playlists
        const plSnap = await getDocs(collection(db, "playlists", userId, "userPlaylists"));
        setPlaylists(
          plSnap.docs.map((d) => ({
            id: d.id,
            name: d.data().name || d.id,
            songs: d.data().songs || [],
          }))
        );
      } catch (err) {
        console.error("Error loading homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, songs]);

  // const bindPlay = (list) => (index) => handleMainPlay(index, list);
  const bindPlay = (list) => (index) => {
    handleMainPlay(index, list);
    // now leave the HomePage panels so that the "main" SongList is rendered
    setActiveTab("");  
  };

  if (loading) return <div className="loading">Loading music...</div>;

  // return (
  //   // <div className="home-page">

  //   <section className="section-wrapper">
        {/* <div className="section"> */}
      /* <h2>🔥 Top Songs</h2>
      <div className="songlist-scrollable">
  


      <SongList
        songs={topSongs}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
        handleMainPlay={bindPlay(topSongs)}
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        audioRefs={audioRefs}
      />
      </div>
      </div>
      
<div className="section">
      <h2>🔁 Latest Releases</h2>
      <SongList
        songs={latestSongs}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
        handleMainPlay={bindPlay(latestSongs)}
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        audioRefs={audioRefs}
      />
      </div> */
return (
  <section className="section-wrapper">
    {showSearchResults ? (
      // ✅ Only show search results when searching
      <SongList
        songs={songs}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
        handleMainPlay={bindPlay(songs)}
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        audioRefs={audioRefs}
      />
    ) : (
      <>
        {recommended.length > 0 && (
          <div className="section">
            <h2>🎺 Recommended Songs</h2>
            <SongList
              songs={recommended}
              likedSongs={likedSongs}
              toggleLike={toggleLike}
              handleMainPlay={bindPlay(recommended)}
              currentSongIndex={currentSongIndex}
              isPlaying={isPlaying}
              audioRefs={audioRefs}
            />
          </div>
        )}

        {favourites.length > 0 && (
          <div className="section">
            <h2>❤️ Your Favourites</h2>
            <SongList
              songs={favourites}
              likedSongs={likedSongs}
              toggleLike={toggleLike}
              handleMainPlay={bindPlay(favourites)}
              currentSongIndex={currentSongIndex}
              isPlaying={isPlaying}
              audioRefs={audioRefs}
            />
          </div>
        )}

        <h2>Your Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map((pl) => (
            <div key={pl.id} className="playlist-card">
              <h3>{pl.name}</h3>
              <div className="playlist-songlist-scrollable">
                <SongList
                  songs={pl.songs}
                  // disablePlay={true}
                  likedSongs={likedSongs}
                  toggleLike={toggleLike}
                  // handleMainPlay={bindPlay(pl.songs)}
                  currentSongIndex={currentSongIndex}
                  isPlaying={isPlaying}
                  audioRefs={audioRefs}
                />
              </div>
            </div>
          ))
        ) : (
         <div className="empty-playlists">
  <img
    src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
    alt="No Playlists"
    className="empty-playlists-icon"
  />
   <h2>🎵 Welcome to Your Music Space 🎧</h2>
  <p>
    Start enjoying songs, explore new music, <br />
    and build your own <strong>playlists</strong> & <strong>favourites</strong> ❤️
  </p>
</div>

        )}
      </>
    )}
  </section>
);
}