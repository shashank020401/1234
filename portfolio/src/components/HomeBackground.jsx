// src/components/HomeBackground.jsx
// npm i framer-motion
//
// Usage:
//   <section id="home" className="relative min-h-screen overflow-hidden">
//     <HomeBackground />
//     <div className="relative z-10"> ...your hero content... </div>
//   </section>

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

// ============================================================
// PALETTE
// ============================================================

const C = {
  blue: "#2f7bff", // electric blue
  sky: "#6fd3ff", // light cyan-blue
  violet: "#6b5cff", // soft violet, used sparingly
};

// Tiny SVG noise, inlined so there's no asset to load
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const DOTS = (color) => ({
  backgroundImage: `radial-gradient(${color} 1px, transparent 1.6px)`,
  backgroundSize: "28px 28px",
});

// ============================================================
// DRIFTING LIGHT
// ============================================================

function Glow({ className, color, animate, duration, reduce }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-[90px] ${className}`}
      style={{ background: color }}
      animate={reduce ? undefined : animate}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

// ============================================================
// ORBIT RINGS
// ============================================================

function Orbits({ reduce }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="-500 -500 1000 1000"
      className="absolute right-[-35%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 sm:right-[-15%] lg:right-[-8%]"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
    >
      <g fill="none" stroke="white" strokeOpacity="0.09">
        <circle r="180" />
        <circle r="300" strokeDasharray="2 10" strokeOpacity="0.18" />
        <circle r="420" />
        <circle r="490" strokeDasharray="1 14" strokeOpacity="0.12" />
      </g>

      {/* Nodes sitting on the rings */}
      <g fill={C.sky}>
        <circle cx="180" cy="0" r="3.5" />
        <circle cx="-212" cy="212" r="3" fillOpacity="0.8" />
        <circle cx="0" cy="-420" r="4" />
        <circle cx="297" cy="297" r="2.5" fillOpacity="0.6" />
      </g>
      <circle cx="180" cy="0" r="10" fill="none" stroke={C.sky} strokeOpacity="0.35" />
    </motion.svg>
  );
}

// A light trail that travels from the upper-right edge into the hero centre.
// It stays behind the content so it adds motion without competing with the copy.
function MotionTrail({ reduce }) {
  const travel = {
    cx: [1180, 1050, 900, 740, 570],
    cy: [-40, 40, 160, 310, 430],
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="motion-trail" x1="1180" y1="0" x2="520" y2="450" gradientUnits="userSpaceOnUse">
          <stop stopColor={C.sky} stopOpacity="0" />
          <stop offset="0.18" stopColor={C.sky} stopOpacity="0.85" />
          <stop offset="0.72" stopColor={C.blue} stopOpacity="0.42" />
          <stop offset="1" stopColor={C.sky} stopOpacity="0" />
        </linearGradient>
        <filter id="motion-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <motion.path
        d="M 1180 -40 C 1030 20, 960 135, 875 220 C 770 325, 670 395, 540 435"
        fill="none"
        stroke="url(#motion-trail)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="10 18"
        animate={reduce ? undefined : { strokeDashoffset: [0, -168] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        r="4"
        fill={C.sky}
        filter="url(#motion-glow)"
        animate={reduce ? undefined : travel}
        transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      />
      <motion.circle
        r="10"
        fill="none"
        stroke={C.sky}
        strokeWidth="1"
        opacity="0.55"
        animate={reduce ? undefined : { ...travel, scale: [0.75, 1.45, 0.75], opacity: [0, 0.65, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

// ============================================================
// HOME BACKGROUND
// ============================================================

export default function HomeBackground({ fadeTo = "var(--bg-secondary)" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Cursor position (px, relative to this section), smoothed
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 140, damping: 22, mass: 0.5 });

  // Revealed (bright) dot grid follows the cursor via a mask
  const mask = useMotionTemplate`radial-gradient(360px circle at ${sx}px ${sy}px, black 0%, transparent 70%)`;
  // Soft light under the cursor
  const halo = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(111,211,255,0.14), transparent 65%)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Resting position: upper right, where the orbit rings sit
    const rest = () => {
      const r = el.getBoundingClientRect();
      mx.set(r.width * 0.68);
      my.set(r.height * 0.38);
    };
    rest();

    if (reduce) return;

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", rest);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", rest);
    };
  }, [mx, my, reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ background: "var(--page-background)" }}
    >
      {/* 1. Slow drifting light */}
      <Glow
        reduce={reduce}
        className="-left-[10%] top-[8%] h-[420px] w-[420px] opacity-40"
        color={C.blue}
        animate={{ x: [0, 90, 20], y: [0, 60, -30], scale: [1, 1.15, 0.95] }}
        duration={22}
      />
      <Glow
        reduce={reduce}
        className="right-[5%] top-[35%] h-[360px] w-[360px] opacity-25"
        color={C.violet}
        animate={{ x: [0, -80, 30], y: [0, -50, 40], scale: [1, 0.9, 1.12] }}
        duration={28}
      />
      <Glow
        reduce={reduce}
        className="bottom-[-12%] left-[30%] h-[380px] w-[520px] opacity-30"
        color={C.sky}
        animate={{ x: [0, 70, -50], y: [0, -30, 20] }}
        duration={26}
      />

      {/* 2. Curved motion line: upper-right to the centre */}
      <MotionTrail reduce={reduce} />

      {/* 3. Orbit rings */}
      <Orbits reduce={reduce} />

      {/* 4. Dot grid: faint everywhere, bright near the cursor */}
      <div
        className="absolute inset-0"
        style={{
          ...DOTS("rgba(255,255,255,0.35)"),
          opacity: 0.14,
          WebkitMaskImage:
            "linear-gradient(to bottom, black 55%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          ...DOTS("rgba(160,225,255,0.95)"),
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <motion.div className="absolute inset-0" style={{ background: halo }} />

      {/* 5. Grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* 6. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 40%, transparent 55%, rgba(2,8,20,0.55) 100%)",
        }}
      />

      {/* 7. Fade into the next section (pass fadeTo to match it) */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `linear-gradient(to bottom, transparent, ${fadeTo})`,
        }}
      />
    </div>
  );
}
