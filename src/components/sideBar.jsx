import React from 'react';
import { Home as HomeIcon, Heart, Plus, Music, X } from 'lucide-react';
import './sideBar.css';

const SideBar = ({setActiveTab, closeSidebar, isOpen}) => {
  return (
       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Close button only on mobile */}
    
  



      <h2 className="sidebar-title">
        <Music size={30} color="#5227FF" />
        SonicVibe
      </h2>

      <ul className="sidebar-list">
        <li>
          <button
            className="sidebar-btn"
            onClick={() => {
              setActiveTab("home");
              closeSidebar();
            }}
          >
            <HomeIcon size={20} /> Home
          </button>
        </li>

        <li>
          <button
            className="sidebar-btn"
            onClick={() => {
              setActiveTab("favourites");
              closeSidebar();
            }}
          >
            <Heart size={20} /> Favourites
          </button>
        </li>

        <li>
          <button
            className="sidebar-btn"
            onClick={() => {
              setActiveTab("playlists");
              closeSidebar();
            }}
          >
            <Plus size={20} /> Your Playlist
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
