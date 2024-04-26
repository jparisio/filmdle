import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/search bar/SearchBar";
import ImageDisplayer from "./components/Image displayer/ImageDisplayer";
import images from "./movies.json";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./components/modal/Modal";
import GameOver from "./components/modal/GameOver";
import Winner from "./components/modal/Winner";

const LIVES_STORAGE_KEY = "filmdle_lives";
const GAME_OVER_STORAGE_KEY = "filmdle_game_over";
const WINNER_STORAGE_KEY = "filmdle_winner";
const LAST_ACCESS_STORAGE_KEY = "filmdle_last_access";

//CURRENT GAME MOVIE BEING GUESSED STORED HERE
let currentIndex = 4;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lives, setLives] = useState(() => {
    const savedLives = localStorage.getItem(LIVES_STORAGE_KEY);
    return savedLives ? parseInt(savedLives) : 3;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [gameOver, setGameOver] = useState(() => {
    const savedGameOver = localStorage.getItem(GAME_OVER_STORAGE_KEY);
    return savedGameOver ? JSON.parse(savedGameOver) : false;
  });
  const [winner, setWinner] = useState(() => {
    const savedWinner = localStorage.getItem(WINNER_STORAGE_KEY);
    return savedWinner ? JSON.parse(savedWinner) : false;
  });

  const [timeUntilNextDay, setTimeUntilNextDay] = useState(
    calculateTimeUntilNextDay()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilNextDay(calculateTimeUntilNextDay());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);

  useEffect(() => {
    const lastAccessTimestamp = localStorage.getItem(LAST_ACCESS_STORAGE_KEY);
    const currentDate = new Date();
    const lastAccessDate = lastAccessTimestamp
      ? new Date(parseInt(lastAccessTimestamp))
      : null;

    // If it's a new day or the application is accessed for the first time, reset local storage
    if (!lastAccessDate || currentDate.getDate() !== lastAccessDate.getDate()) {
      resetLocalStorage();
      localStorage.setItem(
        LAST_ACCESS_STORAGE_KEY,
        currentDate.getTime().toString()
      );
    }
  }, []);

  function calculateTimeUntilNextDay() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
    const timeUntilNextDay = midnight - now; // Calculate the difference in milliseconds
    const secondsUntilNextDay = Math.floor(timeUntilNextDay / 1000); // Convert milliseconds to seconds
    return secondsUntilNextDay;
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  //time calculation
  const time = formatTime(timeUntilNextDay);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleGuess(guess) {
    if (guess === "") return;
    if (
      guess.toLowerCase().trim() ===
      images[currentIndex].title.toLowerCase().trim()
    ) {
      setWinner(true);
    } else {
      if (lives > 0) {
        setLives((prev) => {
          const updatedLives = prev - 1;
          if (updatedLives === 0) {
            setGameOver(true);
          } else {
            setModalOpen(true);
          }
          return updatedLives;
        });
      }
    }
    setSearch("");
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://www.omdbapi.com/?apikey=8775d775&t=${search}`;
      // const url = `http://www.omdbapi.com/?apikey=8775d775&${search}`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.Title);
        console.log(data.Title);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    localStorage.setItem(LIVES_STORAGE_KEY, lives.toString());
  }, [lives]);

  useEffect(() => {
    localStorage.setItem(GAME_OVER_STORAGE_KEY, JSON.stringify(gameOver));
  }, [gameOver]);

  useEffect(() => {
    localStorage.setItem(WINNER_STORAGE_KEY, JSON.stringify(winner));
  }, [winner]);

  // Function to reset local storage
  const resetLocalStorage = () => {
    localStorage.removeItem(LIVES_STORAGE_KEY);
    localStorage.removeItem(GAME_OVER_STORAGE_KEY);
    localStorage.removeItem(WINNER_STORAGE_KEY);
    // Reset the state as well
    setLives(3);
    setGameOver(false);
    setWinner(false);
  };

  const [currMovie, setCurrMovie] = useState({
    title: "placeHolder",
    images: ["placeholder1.jpg", "placeholder2.jpg", "placeholder3.jpg"],
  });

  useEffect(() => {
    fetch("http://localhost:5000/movies").then((res) => {
      res.json().then((data) => {
        setCurrMovie(data);
        // console.log(data);
      });
    });
  }, []);

  // console.log("CURRENT MOVIE TITLE " + currMovie.title);

  return (
    <div className="app-container">
      <h1 className="title">Filmdle</h1>
      <div className="remaining-lives">
        <h3>Guesses remaining:</h3>
        <motion.article>{lives}</motion.article>
      </div>
      <ImageDisplayer images={images[currentIndex]} guesses={lives} />
      {!gameOver && !winner && (
        <SearchBar
          handleSearch={handleSearch}
          data={movies}
          handleGuess={handleGuess}
          search={search}
        />
      )}
      {/* <button onClick={resetLocalStorage}>Reset Local Storage</button> */}
      <AnimatePresence>
        {modalOpen && <Modal setOpen={setModalOpen}>Incorrect Answer</Modal>}
        {gameOver && (
          <GameOver title={images[currentIndex].title} time={time} />
        )}
        {winner && <Winner title={images[currentIndex].title} time={time} />}
      </AnimatePresence>
    </div>
  );
}
