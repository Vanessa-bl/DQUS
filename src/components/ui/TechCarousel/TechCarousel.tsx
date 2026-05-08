import React from "react";
import Marquee from "react-fast-marquee";
import "./TechCarousel.css";

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
  "UX /",
];

export const TechCarousel: React.FC = () => {
  return (
    <div className="tech-carousel-container" aria-label="Tecnologías que usamos">
      <Marquee speed={40} gradient={false} pauseOnHover>
        {technologies.map((tech, i) => (
          <span key={i} className="tech-carousel-item">
            {tech}
          </span>
        ))}
      </Marquee>
    </div>
  );
};
