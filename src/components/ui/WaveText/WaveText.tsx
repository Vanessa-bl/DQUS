import React from "react";
import { motion } from "framer-motion";
import "./WaveText.css";

interface WaveTextProps {
  text: string;
}

export const WaveText: React.FC<WaveTextProps> = ({ text }) => {
  const containerVariants = {
    rest: {},
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 20,
        yoyo: 1,
        duration: 0.2,
      },
    },
  };

  return (
    <motion.span
      className="wave-text"
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {Array.from(text).map((char, idx) => (
        <motion.span
          className="wave-letter"
          key={idx}
          variants={letterVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
