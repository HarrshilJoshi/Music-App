import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

// Add or update a field in a specific playlist
export const addFieldToPlaylist = async (playlistId, fieldName, fieldValue) => {
  const user = auth.currentUser;
  if (!user) {
    console.log("No user signed in");
    return;
  }

  const playlistRef = doc(db, "playlists", user.uid, "userPlaylists", playlistId);

  // This will add a new field or update it if it already exists
  await setDoc(playlistRef, { [fieldName]: fieldValue }, { merge: true });

  console.log(`Field "${fieldName}" updated!`);
};
