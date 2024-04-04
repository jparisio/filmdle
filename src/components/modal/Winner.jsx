import { motion } from "framer-motion";
import "./Modal.css";

const variants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { scale: 0, rotate: 270, opacity: 0 },
};

export default function GameOver({ title, time }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden" // Set initial animation state
      animate="visible" // Set animation state when visible
      exit="exit" // Set animation state when exiting
      transition={{
        duration: 0.5,
        type: "spring",
        damping: 20,
        stiffness: 150,
      }}
      className="incorrect-modal"
    >
      <div className="winner-text">
        <h2>Congrats!</h2>
        <p>
          You were correct! <br /> The Answer was: {title}
        </p>
        <p>Play the next in: {time}</p>
      </div>
    </motion.div>
  );
}
