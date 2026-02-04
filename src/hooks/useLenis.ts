// src/hooks/useLenis.ts
import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = (enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.48,
      easing: (t) => t,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [enabled]);
};
