import type React from "react";
import { motion } from "framer-motion";
import "./logo.css";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white" | "dark";
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "default",
  animated = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "logo-sm",
    md: "logo-md",
    lg: "logo-lg",
  };

  const variantClasses = {
    default: "logo-default",
    white: "logo-white",
    dark: "logo-dark",
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -5 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.a
      href="/"
      aria-label="DevQueens home"
      data-testid="logo"
      className={`logo ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      variants={animated ? logoVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="logo-container">
        {/* Icon */}
        <motion.div
          className="logo-icon"
          variants={animated ? iconVariants : undefined}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            <defs>
              <linearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient
                id="logoGradientWhite"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
              <linearGradient
                id="logoGradientSecondary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Main Hexagon Shape */}
            <path
              d="M20 4L30 10L30 20L20 26L10 20L10 10L20 4Z"
              fill="url(#logoGradient)"
              className="main-shape"
            />

            {/* Inner Code Brackets */}
            <path
              d="M14 12L12 14L12 16L14 18M26 12L28 14L28 16L26 18"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="code-brackets"
            />

            {/* Center Dot */}
            <circle
              cx="20"
              cy="15"
              r="1.5"
              fill="rgba(255,255,255,0.9)"
              className="center-dot"
            />

            {/* Connection Lines */}
            <path
              d="M16 15L18.5 15M21.5 15L24 15"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="connection-lines"
            />

            {/* Bottom Accent */}
            <path
              d="M15 22L20 24L25 22"
              stroke="url(#logoGradientSecondary)"
              strokeWidth="2"
              strokeLinecap="round"
              className="bottom-accent"
            />
          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          className="logo-text"
          variants={animated ? textVariants : undefined}
        >
          <span className="logo-dev">Dev</span>
          <span className="logo-queens">Queens</span>
          {/*<span className="logo-us">US</span>*/}
        </motion.div>
      </div>
    </motion.a>
  );
};

export default Logo;
