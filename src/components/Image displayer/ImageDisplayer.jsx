import React, { useEffect } from "react";
import "./ImageDisplayer.css";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageDisplayer({ images, guesses }) {
  const [currentPage, setCurrentPage] = useState(0);
  const src = `./${images.title}/${images.images[currentPage]}`;

  useEffect(() => {
    // console.log(guesses);
    if (guesses > 0) {
      setCurrentPage(3 - guesses);
    }
  }, [guesses]);

  return (
    <div className="displayer">
      <div className="image-container">
        <motion.img src={src} alt="some image" />
      </div>
      <div className="pages-container">
        <motion.div
          className={currentPage === 0 ? "selected-page-button" : "page-button"}
          onClick={() => setCurrentPage(0)}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
        {guesses <= 2 && guesses >= 1 && (
          <motion.div
            className={
              currentPage === 1 ? "selected-page-button" : "page-button"
            }
            onClick={() => setCurrentPage(1)}
          ></motion.div>
        )}
        {guesses === 1 && (
          <motion.div
            className={
              currentPage === 2 ? "selected-page-button" : "page-button"
            }
            onClick={() => setCurrentPage(2)}
          ></motion.div>
        )}
      </div>
    </div>
  );
}
