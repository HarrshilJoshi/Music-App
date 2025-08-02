import React, { useState } from 'react';
import './seachbar.css';

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://saavnapi-nine.vercel.app/result/?query=${encodeURIComponent(query)}&lyrics=true`
      );
      const data = await res.json();
      // onResults(data.data);
       console.log("Fetched search data:", data);

      
    // ① Use data.data, not data
    // const groups = Array.isArray(data) ? data : [];
    // console.log("Groups :" , groups);

    // // ② Flatten out the nested `songs` arrays
    // const flatSongs = groups.flatMap(group =>
    //   Array.isArray(group.songs) ? group.songs : []
    // );
    let flatSongs = [];
    if (Array.isArray(data)) {
      // If each element looks like a song (has `song`, `media_url`, etc.), use it directly:
      if (data.length > 0 && data[0].song) {
        flatSongs = data;
      }
      // Otherwise, if each element has a `.songs` array, flatten it:
      else if (data.length > 0 && Array.isArray(data[0].songs)) {
        flatSongs = data.flatMap(group => group.songs);
      }
    }
     console.log("Flattened songs:", flatSongs);
    onResults(flatSongs);
    } catch (err) {
      console.error('Search failed:', err);
      onResults([]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search a song , artist , podcast and many more....."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="search-button"
      >
        Search
      </button>
    </form>
  


  );
};

export default SearchBar;
