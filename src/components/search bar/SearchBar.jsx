import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SearchBar.css";

export default function SearchBar({ handleSearch, handleGuess, data, search }) {
  function handleTitleClick(text) {
    handleSearch({ target: { value: text } });
  }
  //store data which is a string into an array
  const movie = [data];
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
      {/* <AnimatePresence> */}
      {search != "" && (
        <motion.div className="suggestion-buttons">
          {movie.map((movie, index) => (
            <motion.button
              key={index}
              onClick={() => handleTitleClick(movie)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {movie}
            </motion.button>
          ))}
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
}
