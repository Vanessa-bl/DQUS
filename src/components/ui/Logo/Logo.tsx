import type React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../theme/ThemeContext";
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
  const { theme } = useTheme();
  const logoSrc =
    variant === "white" ? "/logo-white.svg"
    : variant === "dark" ? "/logo.svg"
    : theme === "dark" ? "/logo-white.svg"
    : "/logo.svg";

  const sizeClasses = {
    sm: "logo-sm",
    md: "logo-md",
    lg: "logo-lg",
  } as const;

  const variantClasses = {
    default: "logo-default",
    white: "logo-white",
    dark: "logo-dark",
  } as const;

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
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
      <motion.img
        src={logoSrc}
        alt="DevQueens logo"
        className="logo-svg"
        draggable={false}
      />
    </motion.a>
  );
};

export default Logo;
