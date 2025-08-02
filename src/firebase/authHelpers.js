// firebase/auth.js
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from './config';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error("Sign-in error", err);
  }
};

export const logout = async () => {
  await signOut(auth);
};
