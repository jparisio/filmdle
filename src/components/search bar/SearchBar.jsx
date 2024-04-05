import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SearchBar.css";

export default function SearchBar({ handleSearch, handleGuess, data, search }) {
  function handleTitleClick(text) {
    handleSearch({ target: { value: text } });
  }
  return (
    <>
      <div className="search-container">
        <div>
          <input
            type="text"
            placeholder="Enter movie guess..."
            onChange={handleSearch}
            value={search}
          />
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
      {data.length > 0 && search != "" && (
        <motion.div className="suggestion-buttons">
          {data.slice(0, 5).map((movie, index) => (
            <motion.button
              key={movie.id}
              onClick={() => handleTitleClick(movie.titleNameText)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {movie.titleNameText}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
