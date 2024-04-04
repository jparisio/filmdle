import { motion } from "framer-motion";
import "./Modal.css";

const variants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { scale: 0, rotate: 270, opacity: 0 },
};

export default function IncorrectModal({ setOpen, children }) {
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
      <p>{children}</p>
      <motion.button
        onClick={() => setOpen(false)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9, borderRadius: "25px" }}
      >
        close
      </motion.button>
    </motion.div>
  );
}
