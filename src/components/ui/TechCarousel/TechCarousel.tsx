// src/components/TechCarousel/TechCarousel.tsx
import React, { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import "./TechCarousel.css";
import { WaveText } from "../WaveText/WaveText";

const technologies = [
  "UI",
  "Vite",
  "React.js",
  "Angular",
  "React Native",
  "Next.js",
  "UI/UX",
  "Figma",
  "TypeScript",
  "HTML",
  "CSS",
  "UX / ",
];

export const TechCarousel: React.FC = () => {
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  // Medir el ancho del primer grupo antes del primer renderizado visible
  useLayoutEffect(() => {
    const measure = () => {
      if (groupRef.current) {
        setGroupWidth(groupRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const animationProps =
    groupWidth > 0
      ? {
          animate: { x: [0, -groupWidth] as [number, number] },
          transition: { repeat: Infinity, ease: "linear", duration: 15 },
        }
      : {};

  return (
    <div
      className="tech-carousel-container"
      aria-label="Tecnologías que usamos"
    >
      <motion.div
        className="tech-carousel-track"
        style={{ width: groupWidth > 0 ? `${groupWidth * 2}px` : "auto" }}
        {...animationProps}
      >
        <div className="tech-carousel-group" ref={groupRef}>
          {technologies.map((tech, idx) => (
            <div key={`first-${idx}`} className="tech-carousel-item">
              <WaveText text={tech} />
            </div>
          ))}
        </div>

        <div className="tech-carousel-group">
          {technologies.map((tech, idx) => (
            <div key={`second-${idx}`} className="tech-carousel-item">
              <WaveText text={tech} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
