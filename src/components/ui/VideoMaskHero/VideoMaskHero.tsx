import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "./VideoMaskHero.css";

function calcParallaxRange(textEl: HTMLElement | null): number {
  if (!textEl) return 14;
  const textW = textEl.scrollWidth;
  const viewW = window.innerWidth;
  if (textW <= viewW) return window.innerWidth < 768 ? 15 : 0;
  return ((textW - viewW) / textW) * 63;
}

const VIDEO_SRC = "https://res.cloudinary.com/djqiqpilh/video/upload/v1778251145/7308093-hd_1280_720_24fps_j1oug7.mp4";

export default function VideoMaskHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const rangeRef = useRef(typeof window !== "undefined" && window.innerWidth < 768 ? 12 : 12);
  const [range, setRange] = useState(rangeRef.current);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], [range, -range]);

  useMotionValueEvent(textX, "change", (latest) => {
    if (textRef.current) {
      textRef.current.style.transform = `translateX(${latest}%)`;
    }
  });

  const updateRange = useCallback(() => {
    const next = calcParallaxRange(textRef.current);
    if (next !== rangeRef.current) {
      rangeRef.current = next;
      setRange(next);
    }
  }, []);

  useEffect(() => {
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, [updateRange]);

  return (
    <div ref={sectionRef} className="video-mask-hero">
      <div className="video-mask-hero__sticky">
        <div className="video-mask-hero__video-wrapper">
          <video
            className="video-mask-hero__video"
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        <div className="video-mask-hero__screen">
          <h1 ref={textRef} className="video-mask-hero__text">
            DevQueens
          </h1>
        </div>
      </div>
    </div>
  );
}
