import { useState, useRef, useEffect } from "react";
import SideBar from "./sideBar.jsx";
import SearchBar from "./SearchBar.jsx";
import { Play, User } from "lucide-react";
import "./player.css";
import Playerbar from "./playerbar";
import DotGrid from "./DotGrid.jsx";
import SongList from "./SongList.jsx";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { likeSong } from "../utils/likedSong.js";
import Favourites from "./favourites.jsx";
import Playlists from "./PlayLists.jsx";
import { getAllPlaylists } from "../utils/PlaylistUtils.js";
import HomePage from "./HomePage.jsx";

function Player() {
  const [songs, setSongs] = useState([]);
  const [visibleLyrics, setVisibleLyrics] = useState({});
  const [likedSongs, setLikedSongs] = useState({});
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
   const [showPlayList, setshowPlayList] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
   const [showFavourites, setShowFavourites] = useState(false);
   const [userId, setUserId] = useState(null);
   const [Query, setQuery] = useState("");
   

   const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Toggle open/close
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // ✅ Force close
  const closeSidebar = () => setIsSidebarOpen(false);
// // Modify the search handler
const handleSearchResults = (results) => {
  //  console.log("🎵 Songs received from search:", results);
  setSongs(results);
  setActiveTab("search");
  setShowSearchResults(true); // Flag that we have search results
};
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 200); // small delay to avoid blocking login redirect
    } else {
      setUserId(user.uid);
    }
  });

  return () => unsubscribe();
}, [navigate]);

  // / Just to see what's going on
useEffect(() => {
  // console.log("✅ userId in Player:", userId);
}, [userId]);

useEffect(() => {
  // console.log("🎵 Songs received from search:", songs);
}, [songs]);


  
  useEffect(() => {
    if (currentSongIndex !== null && audioRefs.current[currentSongIndex]) {
      const audio = audioRefs.current[currentSongIndex];
      if (isPlaying) {
        audio.play().catch((err) => console.error("Play failed:", err));
      } else {
        audio.pause();
      }
    }
  }, [currentSongIndex, isPlaying]);

// useEffect(() => {
//   const fetchLikedSongs = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     const docRef = doc(db, "users", user.uid);
//     const docSnap = await getDoc(docRef);

//     if (!docSnap.exists()) return;

//     const liked = docSnap.data().likedSongs || [];
//     const newLikedMap = {};
//     songs.forEach((song) => {
//       if (liked.some((s) => s.media_url === song.media_url)) {
//         newLikedMap[song.media_url] = true;
//       }
//     });
//     setLikedSongs(newLikedMap);
//   };

//   fetchLikedSongs();
// }, [songs]);



// useEffect(() => {
//   console.log("Songs received from search:", songs);
// }, [songs]);



  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const docRef = doc(db, "users", user.uid);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         const liked = data.likedSongs || [];
  //         const newLikedMap = {};
  //          if (Array.isArray(songs)) {
  //   songs.forEach((song, index) => {
  //     if (liked.some((s) => s.media_url === song.media_url)) {
  //       newLikedMap[index] = true;
  //     }
  //   });
  // }
  //         setLikedSongs(newLikedMap);
  //         setUserPlaylists(data.playlists || []);
  //       } else {
  //         setLikedSongs({});
  //         setUserPlaylists([]);
  //       }
  //     } else {
  //       setLikedSongs({});
  //       setUserPlaylists([]);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [songs]);



  // ✅ This should run only once on mount, not on every songs update
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const liked = data.likedSongs || [];
        setUserPlaylists(data.playlists || []);
        
        // ✅ Move this logic below into a separate useEffect
      } else {
        setLikedSongs({});
        setUserPlaylists([]);
      }
    } else {
      setLikedSongs({});
      setUserPlaylists([]);
    }
  });

  return () => unsubscribe();
}, []); // ✅ Run once


useEffect(() => {
  const updateLikedMap = async () => {
    const user = auth.currentUser;
    if (!user || !songs.length) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;

    const liked = docSnap.data().likedSongs || [];
   const newLikedMap = {};
songs.forEach((song) => {
  if (liked.some((s) => s.media_url === song.media_url)) {
    newLikedMap[song.media_url] = true;
  }
});

    setLikedSongs(newLikedMap);
  };

  updateLikedMap();
}, [songs]);

// const [songs, setSongs] = useState([]);

// const handleSearchResults = (data) => {
//   console.log("Fetched search data:", data); // ✅ 5 items here
//   setSongs(data); // 👈 This must run correctly
// };

// <SearchBar onResults={handleSearchResults} />




  const toggleLyrics = (index) => {
    setVisibleLyrics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


const toggleLike = (song) => {
  if (!song) return;
  
  const key = song.media_url || song.id || song.title; // fallback key
  setLikedSongs((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));

  likeSong(song); // full song object
};


  
const handleHomeClick = () => {
  // setShowSearch(false);
  setshowPlayList(false);
  setShowFavourites(false);
  // setSongs([]);

};

const handleMainPlay = (index, sourceSongs) => {
  const newSongs = sourceSongs || songs;

  if (index === currentSongIndex) {
    setIsPlaying((prev) => !prev);
  } else {
    audioRefs.current.forEach((ref) => {
      if (ref) {
        ref.pause();
        ref.currentTime = 0;
      }
    });
    setCurrentSongIndex(index);
    if (sourceSongs) {
      setSongs(sourceSongs); // ✅ Only set songs if a new list is passed
    }
    setIsPlaying(true);
  }
};


//   const favouriteSongsArray = Object.entries(likedSongs)
//     .filter(([_, liked]) => liked)
//     .map(([index]) => songs[Number(index)]);

  return (
    <div className="player-root">
       

    
      <div className="dotgrid-fullscreen">
        <DotGrid
          className="fixed inset-0-z-0"
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={200}
          shockRadius={300}
          shockStrength={5}
          resistance={500}
          returnDuration={1.5}
        />
      </div>


      {/* <button
        className="hamburger"
        // onClick={() => setSidebarOpen(prev => !prev)}
      >
        ☰
      </button> */}
        <button className="hamburger" onClick={toggleSidebar}>☰</button>

<SideBar 
  isOpen={isSidebarOpen} 
  closeSidebar={closeSidebar} 
  setActiveTab={(tab) => {
    console.log("Active Tab:", tab);
    setActiveTab(tab); // ✅ update the state
  }}
/>



      <div className="player-panel">
        <SearchBar onResults={handleSearchResults}   />
       {/* <SearchBar onResults={(results) => {
  setSongs(results);
  setActiveTab("home");
  setShowSearchResults(true);

}} /> */}

     
<div className="song-row">
 
  {/* {activeTab === "home" && (
    <>
      <HomePage
        userId={userId}
        songs={songs}
        setActiveTab={setActiveTab}
        showSearchResults={showSearchResults}
        Query={Query}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
        handleMainPlay={handleMainPlay}
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        audioRefs={audioRefs}
      />

     
      <SongList
        songs={songs}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
        handleMainPlay={handleMainPlay}
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        audioRefs={audioRefs}
      />
    </>
  )}

  {activeTab === "favourites" && (
    <Favourites
      songs={songs}
      likedSongs={likedSongs}
      toggleLike={toggleLike}
      handleMainPlay={handleMainPlay}
      currentSongIndex={currentSongIndex}
      isPlaying={isPlaying}
      audioRefs={audioRefs}
    />
  )}

  {activeTab === "playlists" && (
    <Playlists
      handleMainPlay={handleMainPlay}
      currentSongIndex={currentSongIndex}
      isPlaying={isPlaying}
      audioRefs={audioRefs}
    />
  )} */}


    {activeTab === "search" ? (
        <SongList
          songs={songs}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          handleMainPlay={handleMainPlay}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          audioRefs={audioRefs}
        />
      ) : activeTab === "home" ? (
        <HomePage
          userId={userId}
          songs={songs}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          handleMainPlay={handleMainPlay}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          audioRefs={audioRefs}
        />
      ) : activeTab === "playlists" ? (
        <Playlists
          handleMainPlay={handleMainPlay}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          audioRefs={audioRefs}
        />
      ) : activeTab === "favourites" ? (
        <Favourites
          songs={songs}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          handleMainPlay={handleMainPlay}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          audioRefs={audioRefs}
        />
      ) : null}
</div>

        
      
      </div>

      <div className="user-menu-container">
        <div
          className="user-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <User size={20} />
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    // console.log("Logged out");
                    navigate("/",{replace:true});
                  })
                  .catch((error) => console.error("Logout error:", error));
              }}
            >
              Logout
            </button>
          </div>
        )}
        
      </div>

      {currentSongIndex !== null && songs[currentSongIndex] && (
        <Playerbar
          // className="searchbar"
          // song={songs[currentSongIndex]}
          // audioRef={audioRefs.current[currentSongIndex]}
          // isPlaying={isPlaying}
          // setIsPlaying={setIsPlaying}
          // // audioRef={audioRefs}
          // currentIndex={currentSongIndex}
          // setCurrentIndex={setCurrentSongIndex}
          // songs={songs}
          // audioRefs={audioRefs}
  //         song={songs[currentSongIndex]}
  // audioRefs={audioRefs} // pass full ref
  // currentIndex={currentSongIndex}
  // isPlaying={isPlaying}
  // setIsPlaying={setIsPlaying}
  // setCurrentIndex={setCurrentSongIndex}
  // songs={songs}

  
  audioRefs={audioRefs}  // Pass full refs object
  currentIndex={currentSongIndex}
  isPlaying={isPlaying}
  setIsPlaying={setIsPlaying}
  setCurrentIndex={setCurrentSongIndex}
  songs={songs}
  song={songs[currentSongIndex]}


        />
      )
      }
      
      
    </div>
  );
}

export default Player;


