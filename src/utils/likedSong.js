import {  setDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase.js"; 
// make sure the path is correct
import { doc, getDoc } from "firebase/firestore";


export const likeSong = async (song) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to like songs.");
    return;
  }

  const userRef = doc(db, "users", user.uid);

  try {
    await setDoc(userRef, {
      likedSongs: arrayUnion({
        id: song.id || song.media_url,
        title: song.title || song.album,
        media_url: song.media_url,
        image: song.image,
        album: song.album,
        singers: song.singers || "Unknown",     // ✅ add singers
        duration: song.duration || "0:00",
      }),
    }, { merge: true });

    console.log("✅ Song liked and saved to Firebase");
  } catch (error) {
    console.error("❌ Error liking song:", error);
  }
};

export const getLikedSongs = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to view liked songs.");
    return [];
  }

  const userRef = doc(db, "users", user.uid);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.likedSongs || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching liked songs:", error);
    return [];
  }
};
