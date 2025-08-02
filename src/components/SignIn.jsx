import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import Orb from "./Orb";
import "./Home.css";

const SignIn = () => {
  const navigate = useNavigate();

  const handleAuth = async (mode) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        console.log(`${mode} successful for:`, result.user.displayName);
        navigate("/player", { replace: true }); // go to player
      }
    } catch (error) {
      console.error(`${mode} failed:`, error);
    }
  };

  return (
    <div className="home-container">
      <Orb hoverIntensity={5} rotateOnHover={true} hue={5} forceHoverState={false} />
      <h1 className="home-title">SonicVibe</h1>
      <div className="button-container">
        <button
          className="get-started-button"
          onClick={() => handleAuth("Sign up")}
        >
          Sign up
        </button>
        <button
          className="get-started-button2"
          onClick={() => handleAuth("Login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignIn;
