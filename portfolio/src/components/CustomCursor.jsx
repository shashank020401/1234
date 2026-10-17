// src/components/CustomCursor.jsx
// npm i framer-motion
//
// Mount once, e.g. in App.jsx:  <CustomCursor />
//
// What it does
//  - an organic off-white blob with a hole, that slowly morphs and turns
//  - springs after the pointer, and stretches along its direction of travel
//  - links / buttons: grows and the hole opens up into a ring
//  - data-cursor="View": grows into a bubble with that text inside
//  - text inputs: shrinks to a small dot
//  - press: squishes in, and a ripple ring pops out where you clicked
//  - a soft ring trails behind with extra lag
//  - mouse only: not shown on touch devices
//  - respects prefers-reduced-motion (no morph, stretch, ripples)
//
// Colours follow the dark: variant (light blob in dark mode, dark blob in
// light mode). Over a dark background the default is the off-white blob.

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const SIZE = 40; // blob diameter in px
const HOLE = 10; // hole diameter in px

const INTERACTIVE =
  "[data-cursor], a, button, [role='button'], summary, label, select, input, textarea";

const TEXT_FIELD =
  "input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=range]), textarea";

const BASE_SCALE = { idle: 1, hover: 1.9, label: 3.2, text: 0.55 };
const HOLE_SCALE = { idle: 1, hover: 2.6, label: 0, text: 1 };

// Hand-drawn feeling: the border radius drifts between organic shapes
const BLOB_SHAPES = [
  "52% 48% 55% 45% / 48% 56% 44% 52%",
  "44% 56% 46% 54% / 58% 44% 56% 42%",
  "56% 44% 52% 48% / 46% 54% 46% 54%",
  "48% 52% 42% 58% / 54% 46% 56% 44%",
];

// Move a spring instantly (older framer-motion has no .jump)
const snap = (mv, value) => (mv.jump ? mv.jump(value) : mv.set(value));

export default function CustomCursor() {
  const reduce = useReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [target, setTarget] = useState({ type: "idle", label: "" });
  const [ripples, setRipples] = useState([]);

  const seen = useRef(false);
  const rippleId = useRef(0);
  const angleRef = useRef(0);

  // ----------------------------------------------------------
  // Pointer position + springs
  // ----------------------------------------------------------

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const follow = reduce
    ? { stiffness: 900, damping: 60, mass: 0.4 }
    : { stiffness: 520, damping: 38, mass: 0.5 };

  const x = useSpring(mx, follow);
  const y = useSpring(my, follow);

  // Trailing ring: much softer
  const ringX = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.7 });
  const ringY = useSpring(my, { stiffness: 110, damping: 18, mass: 0.7 });

  // ----------------------------------------------------------
  // Squash & stretch along the direction of travel
  // ----------------------------------------------------------

  const vx = useVelocity(x);
  const vy = useVelocity(y);

  const speed = useTransform([vx, vy], ([a, b]) => Math.hypot(a, b));

  // Keep the last direction when (nearly) still, so it doesn't snap back
  const angle = useTransform([vx, vy], ([a, b]) => {
    if (Math.hypot(a, b) > 80) {
      angleRef.current = (Math.atan2(b, a) * 180) / Math.PI;
    }
    return angleRef.current;
  });

  const rawStretchX = useTransform(speed, [0, 3000], [1, 1.55], { clamp: true });
  const rawStretchY = useTransform(speed, [0, 3000], [1, 0.7], { clamp: true });
  const stretchX = useSpring(rawStretchX, { stiffness: 260, damping: 26 });
  const stretchY = useSpring(rawStretchY, { stiffness: 260, damping: 26 });

  // ----------------------------------------------------------
  // Setup: only for mouse devices
  // ----------------------------------------------------------

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;

      if (!seen.current) {
        // First move: appear exactly under the pointer
        seen.current = true;
        snap(x, e.clientX);
        snap(y, e.clientY);
        snap(ringX, e.clientX);
        snap(ringY, e.clientY);
      }

      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e) => {
      const el =
        e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;

      if (!el || el.matches(":disabled")) {
        setTarget((t) => (t.type === "idle" ? t : { type: "idle", label: "" }));
        return;
      }

      const label = el.getAttribute("data-cursor");
      if (label) setTarget({ type: "label", label });
      else if (el.matches(TEXT_FIELD)) setTarget({ type: "text", label: "" });
      else setTarget({ type: "hover", label: "" });
    };

    const onDown = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      setPressed(true);

      if (!reduce) {
        const id = ++rippleId.current;
        setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      }
    };

    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => seen.current && setVisible(true);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, mx, my, x, y, ringX, ringY, reduce]);

  if (!enabled) return null;

  const blobScale = BASE_SCALE[target.type] * (pressed ? 0.8 : 1);
  const holeScale = HOLE_SCALE[target.type] * (pressed ? 0.6 : 1);
  const showLabel = target.type === "label" && target.label;

  return (
    <>
      {/* Hide the native cursor everywhere */}
      <style>{`html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }`}</style>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-2 border-neutral-900/50 dark:border-white/60"
            style={{
              width: SIZE,
              height: SIZE,
              marginLeft: -SIZE / 2,
              marginTop: -SIZE / 2,
              x: r.x,
              y: r.y,
            }}
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((list) => list.filter((i) => i.id !== r.id))
            }
          />
        ))}
      </AnimatePresence>

      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          width: SIZE,
          height: SIZE,
          marginLeft: -SIZE / 2,
          marginTop: -SIZE / 2,
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="h-full w-full rounded-full border border-neutral-900/35 dark:border-white/35"
          animate={{
            scale:
              target.type === "label"
                ? 3.8
                : target.type === "hover"
                ? 2.3
                : target.type === "text"
                ? 0.4
                : 1.5,
            opacity: target.type === "text" ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x,
          y,
          width: SIZE,
          height: SIZE,
          marginLeft: -SIZE / 2,
          marginTop: -SIZE / 2,
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {/* 1. rotate to the direction of travel */}
        <motion.div
          className="h-full w-full"
          style={reduce ? undefined : { rotate: angle }}
        >
          {/* 2. stretch along that direction */}
          <motion.div
            className="h-full w-full"
            style={reduce ? undefined : { scaleX: stretchX, scaleY: stretchY }}
          >
            {/* 3. grow / shrink / squish for hover and press */}
            <motion.div
              className="relative h-full w-full"
              animate={{ scale: blobScale }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
            >
              {/* 4. the blob itself: morphing outline, slow turn */}
              <motion.div
                className="absolute inset-0 bg-neutral-900 shadow-[0_6px_20px_rgba(0,0,0,0.25)] dark:bg-[#f4f3ee] dark:shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                style={{ borderRadius: BLOB_SHAPES[0] }}
                animate={
                  reduce
                    ? undefined
                    : { borderRadius: BLOB_SHAPES, rotate: 360 }
                }
                transition={{
                  borderRadius: {
                    duration: 9,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                  rotate: { duration: 16, repeat: Infinity, ease: "linear" },
                }}
              />

              {/* 5. the hole (slightly off-centre, like the sketch) */}
              <motion.span
                className="absolute rounded-full bg-[#f4f3ee] dark:bg-black"
                style={{
                  width: HOLE,
                  height: HOLE,
                  left: SIZE / 2 - HOLE / 2 + 1,
                  top: SIZE / 2 - HOLE / 2 + 1,
                }}
                animate={{ scale: holeScale }}
                transition={{ type: "spring", stiffness: 340, damping: 18 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Label bubble: not rotated or stretched, so text stays upright */}
        <AnimatePresence>
          {showLabel && (
            <motion.span
              key={target.label}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-xs font-semibold tracking-wide text-white dark:text-neutral-900"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              {target.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}