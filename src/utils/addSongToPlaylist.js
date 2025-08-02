import { doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase";

// Add song to a specific playlist
export const addSongToPlaylist = async (playlistId, song) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to manage playlists.");
    return;
  }

  const playlistRef = doc(db, "playlists", user.uid, "userPlaylists", playlistId);

  try {
    await setDoc(playlistRef, {
      songs: arrayUnion({
        id: song.id || song.media_url,
        title: song.title || song.album,
        media_url: song.media_url,
        image: song.image,
        album: song.album,
        singers: song.singers || "Unknown",
        duration: song.duration || "0:00",
      }),
    }, { merge: true });

    console.log(`✅ Song added to playlist "${playlistId}"`);
  } catch (error) {
    console.error("❌ Error adding song to playlist:", error);
  }
};
