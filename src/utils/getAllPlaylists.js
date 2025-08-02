// src/utils/getAllPlaylists.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllPlaylists = async (userId) => {
  try {
    // console.log("📂 Fetching all playlists for userId:", userId); // ✅ Proper log
    const playlistsRef = collection(db, "playlists", userId, "userPlaylists");
    const snapshot = await getDocs(playlistsRef);

    const playlists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return playlists;
  } catch (error) {
    console.error("❌ Error fetching playlists:", error);
    return [];
  }
};
