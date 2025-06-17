import React from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

// Componente animado a partir de Link sin genéricos explícitos
const MotionLink = motion(Link);

export type AnimatedLinkProps = Omit<
  React.ComponentProps<typeof MotionLink>,
  "children"
> & {
  size?: string;
  isActive?: boolean;
  children?: React.ReactNode;
};

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  to,
  children,
  size = "1rem",
  isActive = false,
  style,
  ...props
}) => {
  const underlineVariants: Variants = {
    inactive: { width: 0 },
    hover: { width: "100%" },
    active: { width: "100%" },
  };

  const state = isActive ? "active" : "inactive";

  return (
    <MotionLink
      to={to}
      initial={state}
      animate={state}
      whileHover="hover"
      whileFocus="hover"
      style={{
        display: "inline-block",
        position: "relative",
        fontSize: size,
        color: "var(--link-var)",
        textDecoration: "none",
        ...style,
      }}
      {...props}
    >
      {children}
      <motion.span
        aria-hidden="true"
        variants={underlineVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          backgroundColor: "var(--link-var)",
        }}
      />
    </MotionLink>
  );
};
