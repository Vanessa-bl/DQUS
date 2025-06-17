import React from "react";
import { motion } from "framer-motion";
import "./Button.css";

import type { HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  icon,
  ...props
}) => {
  const classes = ["btn", className].filter(Boolean).join(" ");

  return (
    <motion.button
      className={classes}
      initial="initial"
      whileHover="hover"
      animate="initial"
      style={{ overflow: "hidden" }}
      {...props}
    >
      <motion.span
        className="wave"
        variants={{
          initial: {
            transform: "translateX(-50%) scale(0)",
          },
          hover: {
            transform: "translateX(-50%) scale(1)",
            transition: { duration: 0.5, ease: "easeInOut" },
          },
        }}
      />
      {children && (
        <motion.span
          className="content"
          variants={{
            initial: { color: "var(--btn-text)" },
            hover: {
              color: "var(--btn-bg)",
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
        >
          {children}
        </motion.span>
      )}
      {icon}
    </motion.button>
  );
};
