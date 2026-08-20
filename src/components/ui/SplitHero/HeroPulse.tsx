import { useEffect, useRef } from "react";

type Dot = {
  ring: number;
  angle: number;
  jitter: number;
  speed: number;
  size: number;
  color: string;
  twinkle: number;
};

const RINGS = [
  { r: 0.3, count: 18, dir: 1, speed: 0.06 },
  { r: 0.5, count: 30, dir: -1, speed: 0.04 },
  { r: 0.7, count: 42, dir: 1, speed: 0.025 },
  { r: 0.9, count: 54, dir: -1, speed: 0.016 },
];

/*
 * Inspirado en las llamadas tranquilas de la ballena de Groenlandia
 * (Balaena mysticetus): "moans" simples, graves y de larga duración,
 * emitidos de forma espaciada y con intervalos levemente irregulares.
 * Cada moan es una onda lenta que excita las partículas a su paso.
 */
const PHRASE = 12;
const VOICES = [
  { pulses: [0, 5.4], dur: 5.5, color: "233,51,112", width: 1 },
];

export default function HeroPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    const dots: Dot[] = [];
    RINGS.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        const rose = Math.random() < 0.3;
        dots.push({
          ring: ri,
          angle: (i / ring.count) * Math.PI * 2 + Math.random() * 0.08,
          jitter: Math.random() * Math.PI * 2,
          speed: ring.speed * ring.dir,
          size: 1 + Math.random() * 1.8,
          color: rose
            ? Math.random() < 0.5
              ? "233,51,112"
              : "255,80,122"
            : "255,255,255",
          twinkle: 0.4 + Math.random() * 0.6,
        });
      }
    });

    const draw = (tMs: number) => {
      const t = tMs / 1000;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      // El contenido más externo llega a ~0.95 * maxR (anillo 0.9 + respiración
      // + jitter); se despeja maxR para que nunca se recorte en el canvas.
      const maxR = (Math.min(width, height) / 2 - 8) / 0.95;

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      glow.addColorStop(0, "rgba(233,51,112,0.10)");
      glow.addColorStop(0.55, "rgba(233,51,112,0.03)");
      glow.addColorStop(1, "rgba(233,51,112,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const waves: { r: number; strength: number }[] = [];
      if (!reduced) {
        const tp = t % PHRASE;
        for (const v of VOICES) {
          for (const p of v.pulses) {
            let age = tp - p;
            if (age < 0) age += PHRASE;
            if (age < v.dur) {
              const prog = age / v.dur;
              const alpha = 0.22 * (1 - prog);
              const r = maxR * (0.12 + prog * 0.83);
              waves.push({ r, strength: 1 - prog });
              ctx.beginPath();
              ctx.arc(cx, cy, r, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(${v.color},${alpha.toFixed(3)})`;
              ctx.lineWidth = v.width;
              ctx.stroke();
            }
          }
        }
      }

      const sigma = maxR * 0.06;
      for (const d of dots) {
        const ring = RINGS[d.ring];
        const breathe = 1 + 0.025 * Math.sin(t * 0.5 + d.ring * 1.3);
        let r = ring.r * maxR * breathe + Math.sin(t * 0.6 + d.jitter) * 2;

        let excite = 0;
        for (const w of waves) {
          const dist = r - w.r;
          excite += Math.exp(-(dist * dist) / (2 * sigma * sigma)) * w.strength;
        }
        if (excite > 1) excite = 1;
        r += excite * maxR * 0.015;

        const a = d.angle + (reduced ? 0 : t * d.speed);
        const alpha = reduced
          ? 0.45
          : 0.16 +
            0.1 * Math.abs(Math.sin(t * d.twinkle * 0.4 + d.jitter)) +
            0.45 * excite;
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(a) * r,
          cy + Math.sin(a) * r,
          d.size * (1 + 0.5 * excite),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${d.color},${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    if (reduced) {
      draw(0);
    } else {
      const loop = (ts: number) => {
        draw(ts);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="split-hero__pulse" />;
}
