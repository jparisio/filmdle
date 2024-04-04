import React from "react";
import { motion } from "framer-motion";
import "./SearchBar.css";

export default function SearchBar({ handleSearch, handleGuess, data, search }) {
  function handleTitleClick(text) {
    handleSearch({ target: { value: text } });
  }
  return (
    <div className="search-container">
      <div className="dropdown">
        <input
          type="text"
          placeholder="Enter movie guess..."
          onChange={handleSearch}
          value={search}
        />
        {/* Render the dropdown content if there is data */}
        {data.length > 0 && search != "" && (
          <div className="dropdown-content">
            {data.map((movie) => (
              <p
                key={movie.id}
                onClick={() => handleTitleClick(movie.titleNameText)}
              >
                {movie.titleNameText}
              </p>
            ))}
          </div>
        )}
      </div>
      <motion.button
        onClick={() => handleGuess(search)}
        whileTap={{
          scale: 0.8,
        }}
      >
        enter
      </motion.button>
    </div>
  );
}
