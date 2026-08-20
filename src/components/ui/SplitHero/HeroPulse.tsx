import { useEffect, useRef } from "react";

type Dot = {
  ring: number;
  angle: number;
  jitter: number;
  speed: number;
  size: number;
  white: boolean;
  tint: number;
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
        const accent = Math.random() < 0.14;
        dots.push({
          ring: ri,
          angle: (i / ring.count) * Math.PI * 2 + Math.random() * 0.08,
          jitter: Math.random() * Math.PI * 2,
          speed: ring.speed * ring.dir,
          size: accent ? 5 + Math.random() * 3.5 : 2.2 + Math.random() * 3,
          white: Math.random() < 0.3,
          tint: Math.random() * 0.35 - 0.175,
          twinkle: 0.4 + Math.random() * 0.6,
        });
      }
    });

    // Degradado angular tipo "donut": magenta a la izquierda, naranja a la
    // derecha (mismo lenguaje que el hero de referencia).
    const MAGENTA = [186, 21, 94];
    const ROSE = [233, 51, 112];
    const ORANGE = [255, 145, 60];
    const lerp3 = (a: number[], b: number[], t: number) =>
      a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const angularColor = (a: number, tint: number) => {
      let t = (Math.cos(a) + 1) / 2 + tint;
      t = Math.min(1, Math.max(0, t));
      const c =
        t < 0.5
          ? lerp3(MAGENTA, ROSE, t * 2)
          : lerp3(ROSE, ORANGE, (t - 0.5) * 2);
      return `${c[0]},${c[1]},${c[2]}`;
    };

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
      // Blending aditivo: las partículas se suman como luz (look bokeh,
      // sin bordes duros). Solo aplica a los puntos, no a las ondas.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
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
          ? 0.55
          : 0.28 +
            0.14 * Math.abs(Math.sin(t * d.twinkle * 0.4 + d.jitter)) +
            0.5 * excite;
        const color = d.white
          ? "255,255,255"
          : angularColor(a, d.tint);
        const size = d.size * (1 + 0.5 * excite);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;

        if (d.white) {
          // Destellos: puntos mínimos y nítidos, como polvo de estrellas.
          ctx.beginPath();
          ctx.arc(x, y, Math.min(size * 0.35, 1.2), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.7).toFixed(3)})`;
          ctx.fill();
          continue;
        }

        // Orbe suave: gradiente radial sin borde definido.
        const bloom = size * 3;
        const g = ctx.createRadialGradient(x, y, 0, x, y, bloom);
        const aCore = Math.min(1, alpha * 0.9);
        g.addColorStop(0, `rgba(${color},${aCore.toFixed(3)})`);
        g.addColorStop(0.3, `rgba(${color},${(aCore * 0.35).toFixed(3)})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(x, y, bloom, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Núcleo pequeño y definido para que no se vea borroso.
        ctx.beginPath();
        ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${Math.min(1, alpha * 1.1).toFixed(3)})`;
        ctx.fill();
      }
      ctx.restore();
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
