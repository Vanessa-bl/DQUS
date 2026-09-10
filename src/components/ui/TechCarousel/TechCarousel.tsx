import React from "react";
import Marquee from "react-fast-marquee";
import { useT } from "../../../i18n/useT";
import "./TechCarousel.css";

const HIGHLIGHT_KEYS = [
  "home.marquee.0",
  "home.marquee.1",
  "home.marquee.2",
  "home.marquee.3",
  "home.marquee.4",
  "home.marquee.5",
] as const;

export const TechCarousel: React.FC = () => {
  const t = useT();

  return (
    <div className="tech-carousel-container" aria-label={t("home.marquee.aria", "Marketing highlights")}>
      <Marquee speed={40} gradient={false} pauseOnHover>
        {HIGHLIGHT_KEYS.map((key) => (
          <span key={key} className="tech-carousel-item">
            {t(key, "")}
            <span className="tech-carousel-sep" aria-hidden="true">•</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};
