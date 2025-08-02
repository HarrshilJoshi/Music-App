import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; 

export const createPlaylist = async (playlistName, song) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to create playlists.");
    return;
  }

  const playlistRef = doc(db, "playlists", user.uid, "userPlaylists", playlistName);

  const newPlaylist = {
    name: playlistName,
    createdAt: new Date(),
    songs: song ? [song] : [],
  };

  try {
    await setDoc(playlistRef, newPlaylist);
    console.log("✅ Playlist created in Firestore:", playlistName);
  } catch (error) {
    console.error("❌ Error creating playlist:", error);
  }
};
