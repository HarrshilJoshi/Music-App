// // import React, { useEffect, useState } from 'react';
// // import './playerbar.css';

// // import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

// // const Playerbar = ({
// //   song,
// //   audioRef,
// //   isPlaying,
// //   setIsPlaying,
// //   currentIndex,
// //   setCurrentIndex,
// //   songs,
// //   audioRefs
// // }) => {
// //   const [progress, setProgress] = useState(0);

// //   useEffect(() => {
// //     const audio = audioRef;
// //     if (!audio) return;

// //     const updateProgress = () => {
// //       if (!audio) return;
// //       const { currentTime, duration } = audio;
// //       if (!isNaN(duration) && duration > 0) {
// //         setProgress((currentTime / duration) * 100);
// //       }
// //     };

// //     audio.addEventListener('timeupdate', updateProgress);
// //     return () => audio.removeEventListener('timeupdate', updateProgress);
// //   }, [audioRef]);

// //   const handleTogglePlay = () => {
// //     setIsPlaying(prev => !prev);
// //   };


// // const handleSeek = (e) => {
// //   const audio = audioRef; // already an HTMLAudioElement
// //   if (!audio || isNaN(audio.duration)) return;

// //   const { left, width } = e.currentTarget.getBoundingClientRect();
// //   const clickX = e.clientX - left;
// //   const newTime = (clickX / width) * audio.duration;

// //   audio.currentTime = newTime;

// //   // Force progress bar update immediately
// //   setProgress((newTime / audio.duration) * 100);
// // };



// //   const handleNext = () => {
// //     const nextIndex = (currentIndex + 1) % songs.length;
// //     // Pause current
// //     if (audioRefs.current[currentIndex]) {
// //       audioRefs.current[currentIndex].pause();
// //       audioRefs.current[currentIndex].currentTime = 0;
// //     }
// //     setCurrentIndex(nextIndex);
// //     setIsPlaying(true);
// //   };

// //   const handlePrev = () => {
// //     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
// //     if (audioRefs.current[currentIndex]) {
// //       audioRefs.current[currentIndex].pause();
// //       audioRefs.current[currentIndex].currentTime = 0;
// //     }
// //     setCurrentIndex(prevIndex);
// //     setIsPlaying(true);
// //   };
// // return (
// //   <div className="playerbar-container">
// //     <div className="playerbar-inner">
// //       <div className="song-info-bar">
// //         <img
// //           className="pb-album-art"
// //           src={song.image}
// //           onError={e => (e.currentTarget.src = 'https://via.placeholder.com/60')}
// //           alt={song.album}
// //         />
// //         <div className="pb-text-info">
// //           <div className="pb-title">{song.title || 'Unknown Title'}</div>
// //           <div className="pb-artist">{song.singers || 'Unknown Artist'}</div>
// //         </div>
// //       </div>

// //       <div className="player-controls-container">
// //         <div className="player-controls">
// //           <button className="pb-btn" onClick={handlePrev}><FaStepBackward /></button>
// //           <button className="pb-btn" onClick={handleTogglePlay}>
// //             {isPlaying ? <FaPause /> : <FaPlay />}
// //           </button>
// //           <button className="pb-btn" onClick={handleNext}><FaStepForward /></button>
// //         </div>

// //         <div className="progress-container" onClick={handleSeek}>
// //           <div className="progress-bar">
// //             <div className="progress" style={{ width: `${progress}%` }} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // };

// // export default Playerbar;




// import React, { useEffect, useState } from 'react';
// import './playerbar.css';

// import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

// const Playerbar = ({
//   song,
//   audioRef,
//   isPlaying,
//   setIsPlaying,
//   currentIndex,
//   setCurrentIndex,
//   songs,
//   audioRefs
// }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const audio = audioRef;
//     if (!audio) return;

//     const updateProgress = () => {
//       if (!audio) return;
//       const { currentTime, duration } = audio;
//       if (!isNaN(duration) && duration > 0) {
//         setProgress((currentTime / duration) * 100);
//       }
//     };

//     audio.addEventListener('timeupdate', updateProgress);
//     return () => audio.removeEventListener('timeupdate', updateProgress);
//   }, [audioRef]);

//   const handleTogglePlay = () => {
//     setIsPlaying(prev => !prev);
//   };

//   const handleSeek = e => {
//     const audio = audioRef;
//     if (!audio) return;
//     const { left, width } = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - left;
//     const newTime = (clickX / width) * audio.duration;
//     if (!isNaN(newTime)) audio.currentTime = newTime;
//   };

//   const handleNext = () => {
//     const nextIndex = (currentIndex + 1) % songs.length;
//     // Pause current
//     if (audioRefs.current[currentIndex]) {
//       audioRefs.current[currentIndex].pause();
//       audioRefs.current[currentIndex].currentTime = 0;
//     }
//     setCurrentIndex(nextIndex);
//     setIsPlaying(true);
//   };

//   const handlePrev = () => {
//     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
//     if (audioRefs.current[currentIndex]) {
//       audioRefs.current[currentIndex].pause();
//       audioRefs.current[currentIndex].currentTime = 0;
//     }
//     setCurrentIndex(prevIndex);
//     setIsPlaying(true);
//   };
// return (
//   <div className="playerbar-container">
//     <div className="playerbar-inner">
//       <div className="song-info-bar">
//         <img
//           className="pb-album-art"
//           src={song.image}
//           onError={e => (e.currentTarget.src = 'https://via.placeholder.com/60')}
//           alt={song.album}
//         />
//         <div className="pb-text-info">
//           <div className="pb-title">{song.title || 'Unknown Title'}</div>
//           <div className="pb-artist">{song.singers || 'Unknown Artist'}</div>
//         </div>
//       </div>

//       <div className="player-controls-container">
//         <div className="player-controls">
//           <button className="pb-btn" onClick={handlePrev}><FaStepBackward /></button>
//           <button className="pb-btn" onClick={handleTogglePlay}>
//             {isPlaying ? <FaPause /> : <FaPlay />}
//           </button>
//           <button className="pb-btn" onClick={handleNext}><FaStepForward /></button>
//         </div>

//         <div className="progress-container" onClick={handleSeek}>
//           <div className="progress-bar">
//             <div className="progress" style={{ width: ${progress}% }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// };

// export default Playerbar;



















// // // // import React, { useEffect, useState } from "react";
// // // // import "./playerbar.css";
// // // // import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

// // // // const Playerbar = ({
// // // //   song,
// // // //   audioRefs,
// // // //   isPlaying,
// // // //   setIsPlaying,
// // // //   currentIndex,
// // // //   setCurrentIndex,
// // // //   songs
// // // // }) => {
// // // //   const [progress, setProgress] = useState(0);

// // // //   // Always get the current audio element
// // // //   const audio = audioRefs.current[currentIndex];

// // // //   useEffect(() => {
// // // //     if (!audio) return;

// // // //     const updateProgress = () => {
// // // //       if (!audio) return;
// // // //       const { currentTime, duration } = audio;
// // // //       if (!isNaN(duration) && duration > 0) {
// // // //         setProgress((currentTime / duration) * 100);
// // // //       }
// // // //     };

// // // //     audio.addEventListener("timeupdate", updateProgress);
// // // //     return () => audio.removeEventListener("timeupdate", updateProgress);
// // // //   }, [audio, currentIndex]);

// // // //   const handleTogglePlay = () => {
// // // //     setIsPlaying((prev) => !prev);
// // // //   };

// // // //   const handleSeek = (e) => {
// // // //     if (!audio || isNaN(audio.duration)) return;

// // // //     const { left, width } = e.currentTarget.getBoundingClientRect();
// // // //     const clickX = e.clientX - left;
// // // //     const newTime = (clickX / width) * audio.duration;

// // // //     audio.currentTime = newTime;
// // // //     setProgress((newTime / audio.duration) * 100); // Force UI update
// // // //   };

// // // //   const handleNext = () => {
// // // //     if (audio) {
// // // //       audio.pause();
// // // //       audio.currentTime = 0;
// // // //     }
// // // //     const nextIndex = (currentIndex + 1) % songs.length;
// // // //     setCurrentIndex(nextIndex);
// // // //     setIsPlaying(true);
// // // //   };

// // // //   const handlePrev = () => {
// // // //     if (audio) {
// // // //       audio.pause();
// // // //       audio.currentTime = 0;
// // // //     }
// // // //     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
// // // //     setCurrentIndex(prevIndex);
// // // //     setIsPlaying(true);
// // // //   };

// // // //   return (
// // // //     <div className="playerbar-container">
// // // //       <div className="playerbar-inner">
// // // //         <div className="song-info-bar">
// // // //           <img
// // // //             className="pb-album-art"
// // // //             src={song.image}
// // // //             onError={(e) =>
// // // //               (e.currentTarget.src = "https://via.placeholder.com/60")
// // // //             }
// // // //             alt={song.album}
// // // //           />
// // // //           <div className="pb-text-info">
// // // //             <div className="pb-title">{song.title || "Unknown Title"}</div>
// // // //             <div className="pb-artist">{song.singers || "Unknown Artist"}</div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="player-controls-container">
// // // //           <div className="player-controls">
// // // //             <button className="pb-btn" onClick={handlePrev}>
// // // //               <FaStepBackward />
// // // //             </button>
// // // //             <button className="pb-btn" onClick={handleTogglePlay}>
// // // //               {isPlaying ? <FaPause /> : <FaPlay />}
// // // //             </button>
// // // //             <button className="pb-btn" onClick={handleNext}>
// // // //               <FaStepForward />
// // // //             </button>
// // // //           </div>

// // // //           <div className="progress-container" onClick={handleSeek}>
// // // //             <div className="progress-bar">
// // // //               <div className="progress" style={{ width: `${progress}%` }} />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Playerbar;





// // // import React, { useEffect, useState } from 'react';
// // // import './playerbar.css';
// // // import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

// // // const Playerbar = ({
// // //   song,
// // //   audioRefs,
// // //   currentIndex,
// // //   isPlaying,
// // //   setIsPlaying,
// // //   setCurrentIndex,
// // //   songs
// // // }) => {
// // //   const [progress, setProgress] = useState(0);

// // //   // Always get the LIVE audio element
// // //   const audio = audioRefs.current[currentIndex];

// // //   // Update progress in real-time
// // //   useEffect(() => {
// // //     if (!audio) return;

// // //     const updateProgress = () => {
// // //       if (!audio) return;
// // //       const { currentTime, duration } = audio;
// // //       if (!isNaN(duration) && duration > 0) {
// // //         setProgress((currentTime / duration) * 100);
// // //       }
// // //     };

// // //     audio.addEventListener('timeupdate', updateProgress);
// // //     return () => audio.removeEventListener('timeupdate', updateProgress);
// // //   }, [audio, currentIndex]);

// // //   // Toggle play/pause
// // //   const handleTogglePlay = () => {
// // //     if (!audio) return;
// // //     setIsPlaying(prev => !prev);
// // //   };

// // //   // Seek to position on progress bar click
// // //   const handleSeek = (e) => {
// // //     if (!audio || isNaN(audio.duration)) return;

// // //     const { left, width } = e.currentTarget.getBoundingClientRect();
// // //     const clickX = e.clientX - left;
// // //     const newTime = (clickX / width) * audio.duration;

// // //     audio.currentTime = newTime;
// // //     setProgress((newTime / audio.duration) * 100); // Force visual update

// // //     // Auto-play after seek
// // //     if (!isPlaying) {
// // //       setIsPlaying(true);
// // //     }
// // //   };

// // //   // Next song
// // //   const handleNext = () => {
// // //     if (audio) {
// // //       audio.pause();
// // //       audio.currentTime = 0;
// // //     }
// // //     const nextIndex = (currentIndex + 1) % songs.length;
// // //     setCurrentIndex(nextIndex);
// // //     setIsPlaying(true);
// // //   };

// // //   // Previous song
// // //   const handlePrev = () => {
// // //     if (audio) {
// // //       audio.pause();
// // //       audio.currentTime = 0;
// // //     }
// // //     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
// // //     setCurrentIndex(prevIndex);
// // //     setIsPlaying(true);
// // //   };

// // //   if (!song) return null; // Prevent rendering if no song

// // //   return (
// // //     <div className="playerbar-container">
// // //       <div className="playerbar-inner">
// // //         {/* Song Info */}
// // //         <div className="song-info-bar">
// // //           <img
// // //             className="pb-album-art"
// // //             src={song.image}
// // //             onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/60')}
// // //             alt={song.album}
// // //           />
// // //           <div className="pb-text-info">
// // //             <div className="pb-title">{song.title || 'Unknown Title'}</div>
// // //             <div className="pb-artist">{song.singers || 'Unknown Artist'}</div>
// // //           </div>
// // //         </div>

// // //         {/* Player Controls */}
// // //         <div className="player-controls-container">
// // //           <div className="player-controls">
// // //             <button className="pb-btn" onClick={handlePrev}><FaStepBackward /></button>
// // //             <button className="pb-btn" onClick={handleTogglePlay}>
// // //               {isPlaying ? <FaPause /> : <FaPlay />}
// // //             </button>
// // //             <button className="pb-btn" onClick={handleNext}><FaStepForward /></button>
// // //           </div>

// // //           {/* Progress Bar */}
// // //           <div className="progress-container" onClick={handleSeek}>
// // //             <div className="progress-bar">
// // //               <div className="progress" style={{ width: `${progress}%` }} />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Playerbar;




















// // import React, { useEffect, useState } from 'react';
// // import './playerbar.css';
// // import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

// // const Playerbar = ({
// //   song,
// //   audioRefs,
// //   currentIndex,
// //   isPlaying,
// //   setIsPlaying,
// //   setCurrentIndex,
// //   songs
// // }) => {
// //   const [progress, setProgress] = useState(0);
// //   // Live audio element
// //   const audio = audioRefs.current[currentIndex];

// //   // Pause all other audio elements
// //   const pauseOthers = () => {
// //     audioRefs.current.forEach((el, idx) => {
// //       if (el && idx !== currentIndex) {
// //         el.pause();
// //         el.currentTime = 0;
// //       }
// //     });
// //   };

// //   // Update progress in real-time
// //   useEffect(() => {
// //     if (!audio) return;
// //     const updateProgress = () => {
// //       const { currentTime, duration } = audio;
// //       if (!isNaN(duration) && duration > 0) {
// //         setProgress((currentTime / duration) * 100);
// //       }
// //     };
// //     audio.addEventListener('timeupdate', updateProgress);
// //     return () => audio.removeEventListener('timeupdate', updateProgress);
// //   }, [audio, currentIndex]);

// //   // Toggle play/pause
// //   const handleTogglePlay = () => {
// //     if (!audio) return;
// //     if (isPlaying) {
// //       audio.pause();
// //       setIsPlaying(false);
// //     } else {
// //       pauseOthers();
// //       audio.play();
// //       setIsPlaying(true);
// //     }
// //   };

// //   // Seek to position on progress bar click
// //   const handleSeek = (e) => {
// //     if (!audio || isNaN(audio.duration)) return;
// //     const { left, width } = e.currentTarget.getBoundingClientRect();
// //     const clickX = e.clientX - left;
// //     const newTime = (clickX / width) * audio.duration;
// //     audio.currentTime = newTime;
// //     setProgress((newTime / audio.duration) * 100);
// //     // Continue playing after seek
// //     if (!isPlaying) {
// //       pauseOthers();
// //       audio.play();
// //       setIsPlaying(true);
// //     }
// //   };

// //   // Next song
// //   const handleNext = () => {
// //     pauseOthers();
// //     const nextIndex = (currentIndex + 1) % songs.length;
// //     setCurrentIndex(nextIndex);
// //     setIsPlaying(true);
// //   };

// //   // Previous song
// //   const handlePrev = () => {
// //     pauseOthers();
// //     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
// //     setCurrentIndex(prevIndex);
// //     setIsPlaying(true);
// //   };

// //   if (!song) return null;

// //   return (
// //     <div className="playerbar-container">
// //       <div className="playerbar-inner">
// //         {/* Song Info */}
// //         <div className="song-info-bar">
// //           <img
// //             className="pb-album-art"
// //             src={song.image}
// //             onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/60')}
// //             alt={song.album}
// //           />
// //           <div className="pb-text-info">
// //             <div className="pb-title">{song.title || 'Unknown Title'}</div>
// //             <div className="pb-artist">{song.singers || 'Unknown Artist'}</div>
// //           </div>
// //         </div>

// //         {/* Player Controls */}
// //         <div className="player-controls-container">
// //           <div className="player-controls">
// //             <button className="pb-btn" onClick={handlePrev}><FaStepBackward /></button>
// //             <button className="pb-btn" onClick={handleTogglePlay}>
// //               {isPlaying ? <FaPause /> : <FaPlay />}
// //             </button>
// //             <button className="pb-btn" onClick={handleNext}><FaStepForward /></button>
// //           </div>

// //           {/* Progress Bar */}
// //           <div className="progress-container" onClick={handleSeek}>
// //             <div className="progress-bar">
// //               <div className="progress" style={{ width: `${progress}%` }} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Playerbar;
















import React, { useEffect, useState } from 'react';
import './playerbar.css';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const Playerbar = ({
  song,
  audioRefs,
  currentIndex,
  isPlaying,
  setIsPlaying,
  setCurrentIndex,
  songs
}) => {
  const [progress, setProgress] = useState(0);

  // Get the current audio element
  const audio = audioRefs.current[currentIndex];
  const [showLyrics, setShowLyrics] = useState(false);

  // Handle progress updates and cleanup
  useEffect(() => {
  if (!audio) return;

  const updateProgress = () => {
    if (!audio || isNaN(audio.duration)) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleSongEnd = () => {
    handleNext(); // Play the next song automatically
  };

  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', handleSongEnd);

  return () => {
    audio.removeEventListener('timeupdate', updateProgress);
    audio.removeEventListener('ended', handleSongEnd);
    setShowLyrics(false);
  };
}, [audio, currentIndex]);

  // Control playback state
  const handleTogglePlay = () => {
    if (!audio) return;
    setIsPlaying(!isPlaying);
  };

  // Seek functionality
  const handleSeek = (e) => {
    if (!audio || isNaN(audio.duration)) return;
    
    const progressContainer = e.currentTarget;
    const clickPosition = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.clientWidth;
    const newTime = clickPosition * audio.duration;
    
    audio.currentTime = newTime;
    setProgress(clickPosition * 100);
  };

  // Stop current track before switching
  const stopCurrentTrack = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  // Next track with cleanup
  const handleNext = () => {
    stopCurrentTrack();
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  // Previous track with cleanup
  const handlePrev = () => {
    stopCurrentTrack();
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };


  const toggleLyrics = () => {
    setShowLyrics(prev => !prev);
  };

  // if (!song) return null;

  if (!song) return null;

  return (
    <div className="playerbar-container">
      <div className="playerbar-inner">
        <div className="song-info-bar">
          <img
            className="pb-album-art"
            src={song.image}
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/60')}
            alt={song.album}
          />
          <div className="pb-text-info">
            <div className="pb-title">{song.title || 'Unknown Title'}</div>
            <div className="pb-artist">{song.singers || 'Unknown Artist'}</div>
          </div>
        </div>

        <div className="player-controls-container">
          <div className="player-controls">
            <button className="pb-btn" onClick={handlePrev}><FaStepBackward /></button>
            <button className="pb-btn" onClick={handleTogglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="pb-btn" onClick={handleNext}><FaStepForward /></button>
            {/* <button className="pb-btn lyrics-toggle" onClick={toggleLyrics}>
              {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
            </button> */}
          </div>

          <div className="progress-container" onClick={handleSeek}>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Playerbar;