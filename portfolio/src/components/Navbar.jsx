// src/components/Navbar.jsx
// npm i framer-motion lucide-react

import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Home,
  User,
  Code2,
  FolderKanban,
  Briefcase,
  MessageSquare,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

import useTheme from "../hooks/useTheme";

// ============================================================
// NAVIGATION ITEMS
// ============================================================

const ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "internship", label: "Internship", icon: Briefcase },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
];

// ============================================================
// CONSTANTS
// ============================================================

const FAR = 99999;

const SPRING = {
  stiffness: 320,
  damping: 24,
  mass: 0.6,
};

// Compact = phones
const SIZE = {
  desktop: 44,
  compact: 36,
};

const PEAK_WIDTH = 128;

// Outer pill height = item height + 16px vertical padding.
const PILL_H = {
  desktop: 60,
  compact: 52,
};

// ------------------------------------------------------------
// Theme-aware glass
// ------------------------------------------------------------

const GLASS_FRAME =
  "border border-black/10 text-neutral-900 backdrop-blur-xl " +
  "shadow-[0_8px_32px_rgba(20,30,60,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] " +
  "transition-colors duration-300 " +
  "dark:border-white/20 dark:text-white " +
  "dark:shadow-[0_8px_32px_rgba(0,20,50,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]";

const BG_REST = "bg-white/60 dark:bg-white/10";

const BG_SCROLLED = "bg-white/85 dark:bg-white/15";

const BG_HOVER =
  "hover:bg-white/80 dark:hover:bg-white/15";

const FOCUS_RING =
  "outline-none focus-visible:ring-2 " +
  "focus-visible:ring-neutral-900/60 " +
  "dark:focus-visible:ring-white/80";

// ============================================================
// HOOKS
// ============================================================

function useCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");

    const update = () => setCompact(mq.matches);

    update();

    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  return compact;
}

// ============================================================
// THEME ICON
// ============================================================

function ThemeIcon({ theme, size = 19 }) {
  return (
    <span className="relative flex h-full w-full items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="flex"
          initial={{
            rotate: -90,
            scale: 0.4,
            opacity: 0,
          }}
          animate={{
            rotate: 0,
            scale: 1,
            opacity: 1,
          }}
          exit={{
            rotate: 90,
            scale: 0.4,
            opacity: 0,
          }}
          transition={{
            duration: 0.22,
            ease: "easeOut",
          }}
        >
          {theme === "dark" ? (
            <Moon size={size} strokeWidth={2} />
          ) : (
            <Sun size={size} strokeWidth={2} />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ============================================================
// DOCK ITEM
// ============================================================

function DockItem({
  item,
  index,
  mouseX,
  active,
  onSelect,
  compact,
  reduce,
}) {
  const ref = useRef(null);

  const Icon = item.icon;

  const base = compact ? SIZE.compact : SIZE.desktop;

  const peak = compact || reduce
    ? base
    : PEAK_WIDTH;

  const lift = compact || reduce
    ? 0
    : -4;

  // Distance from pointer to the centre of this item
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();

    return box
      ? x - (box.left + box.width / 2)
      : FAR;
  });

  // Magnetic width
  const width = useSpring(
    useTransform(
      distance,
      [-150, 0, 150],
      [base, peak, base]
    ),
    SPRING
  );

  // Magnetic lift
  const y = useSpring(
    useTransform(
      distance,
      [-150, 0, 150],
      [0, lift, 0]
    ),
    SPRING
  );

  // Label fades + slides in as the item widens
  const labelOpacity = useTransform(
    width,
    [84, 120],
    [0, 1]
  );

  const labelX = useTransform(
    width,
    [84, 120],
    [-8, 0]
  );

  return (
    <motion.a
      ref={ref}
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect(item.id);
      }}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      initial={{
        scale: 0.4,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
        delay: reduce
          ? 0
          : 0.35 + index * 0.05,
      }}
      whileTap={{ scale: 0.9 }}
      style={{
        width,
        y,
        height: base,
      }}
      className={`
        group relative flex shrink-0 items-center justify-start
        overflow-hidden rounded-full text-neutral-800
        dark:text-white
        transition-colors duration-300
        ${FOCUS_RING}
        ${active
          ? ""
          : "hover:bg-black/5 dark:hover:bg-white/10"}
      `}
    >
      {/* Active indicator */}
      {active && (
        <motion.span
          layoutId="active-pill"
          className="
            absolute inset-0
            bg-black/10
            shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
            dark:bg-white/20
            dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
          "
          style={{
            borderRadius: 9999,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* Fixed icon area */}
      <span
        className="
          relative z-10 flex shrink-0
          items-center justify-center
        "
        style={{
          width: base,
          height: base,
        }}
      >
        <motion.span
          className="flex"
          whileHover={
            reduce
              ? undefined
              : {
                  scale: 1.15,
                  rotate: -6,
                }
          }
          animate={{
            scale: active ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          <Icon
            size={compact ? 17 : 18}
            strokeWidth={2}
          />
        </motion.span>

        {/* Contact availability indicator on phones */}
        {compact && item.id === "contact" && (
          <motion.span
            aria-hidden
            className="
              absolute right-[7px] top-[7px]
              h-1.5 w-1.5 rounded-full
              bg-emerald-400
              shadow-[0_0_6px_rgba(52,211,153,0.8)]
            "
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1.5, 1],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </span>

      {/* Label */}
      <motion.span
        style={{
          opacity: labelOpacity,
          x: labelX,
        }}
        className="
          relative z-10 hidden
          whitespace-nowrap pr-4
          text-sm font-medium
          sm:inline
        "
      >
        {item.label}
      </motion.span>
    </motion.a>
  );
}

// ============================================================
// THEME TOGGLE
// ============================================================

function ThemeToggle({
  theme,
  onToggle,
  reduce,
  variant,
  compactSize,
}) {
  const label =
    theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode";

  // Mobile dock variant
  if (variant === "dock") {
    return (
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={label}
        initial={{
          scale: 0.4,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
          delay: reduce
            ? 0
            : 0.35 + ITEMS.length * 0.05,
        }}
        whileTap={{
          scale: 0.88,
        }}
        style={{
          width: compactSize,
          height: compactSize,
        }}
        className={`
          flex shrink-0 items-center
          justify-center rounded-full
          text-neutral-800
          transition-colors duration-300
          hover:bg-black/5
          dark:text-white
          dark:hover:bg-white/10
          sm:hidden
          ${FOCUS_RING}
        `}
      >
        <ThemeIcon
          theme={theme}
          size={17}
        />
      </motion.button>
    );
  }

  // Desktop pill variant
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={label}
      initial={{
        x: 40,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 0.7,
        delay: 0.25,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              scale: 1.06,
              y: -1,
            }
      }
      whileTap={{
        scale: 0.92,
      }}
      className={`
        pointer-events-auto hidden
        h-[60px] w-[60px]
        shrink-0 items-center
        justify-center rounded-full
        sm:flex
        ${GLASS_FRAME}
        ${BG_REST}
        ${BG_HOVER}
        ${FOCUS_RING}
      `}
    >
      <ThemeIcon theme={theme} />
    </motion.button>
  );
}

// ============================================================
// NAVBAR
// ============================================================

export default function Navbar() {
  const mouseX = useMotionValue(FAR);

  const [active, setActive] = useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  const compact = useCompact();

  const reduce = useReducedMotion();

  const { theme, toggle } = useTheme();

  // ----------------------------------------------------------
  // Scroll progress
  // ----------------------------------------------------------

  const {
    scrollY,
    scrollYProgress,
  } = useScroll();

  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 24,
      mass: 0.3,
    }
  );

  useMotionValueEvent(
    scrollY,
    "change",
    (v) => {
      setScrolled(v > 24);
    }
  );

  // ----------------------------------------------------------
  // Locks observer while smooth scrolling
  // ----------------------------------------------------------

  const lockRef = useRef(false);

  const lockTimer = useRef(null);

  // ==========================================================
  // ACTIVE SECTION DETECTION
  // ==========================================================

  useEffect(() => {
    const elements = ITEMS
      .map((item) =>
        document.getElementById(item.id)
      )
      .filter(Boolean);

    if (!elements.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (lockRef.current) return;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        {
          rootMargin:
            "-45% 0px -50% 0px",
        }
      );

    elements.forEach((el) =>
      observer.observe(el)
    );

    return () => {
      observer.disconnect();

      clearTimeout(lockTimer.current);
    };
  }, []);

  // ==========================================================
  // SMOOTH SCROLL
  // ==========================================================

  const scrollTo = (id) => {
    lockRef.current = true;

    clearTimeout(lockTimer.current);

    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 900);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: reduce
          ? "auto"
          : "smooth",
        block: "start",
      });

    setActive(id);
  };

  // ==========================================================
  // UI
  // ==========================================================

  const pillH = compact
    ? PILL_H.compact
    : PILL_H.desktop;

  return (
    <div
      className="
        pointer-events-none
        fixed inset-x-0 top-4
        z-50 flex justify-center
        px-3
      "
    >
      {/* Everything stays aligned on the same centre line */}
      <div
        className="
          flex items-center gap-1.5
        "
      >
          {/* ==================================================
              MAIN NAVIGATION DOCK
            ================================================== */}
        <motion.nav
          aria-label="Primary"
          initial={{
            y: -90,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            y: {
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: 0.2,
            },
            opacity: {
              delay: 0.2,
            },
          }}
          onPointerMove={(e) => {
            if (
              e.pointerType === "mouse" &&
              !reduce
            ) {
              mouseX.set(e.clientX);
            }
          }}
          onPointerLeave={() => {
            mouseX.set(FAR);
          }}
          style={{
            height: pillH,
          }}
          className={`
            pointer-events-auto
            relative flex items-center
            gap-0.5 rounded-full
            px-2 sm:gap-1
            ${GLASS_FRAME}
            ${scrolled
              ? BG_SCROLLED
              : BG_REST}
          `}
        >
          {/* Navigation items */}
          {ITEMS.map((item, i) => (
            <DockItem
              key={item.id}
              item={item}
              index={i}
              mouseX={mouseX}
              active={
                active === item.id
              }
              onSelect={scrollTo}
              compact={compact}
              reduce={reduce}
            />
          ))}

          {/* Phones: theme toggle inside nav */}
          <ThemeToggle
            variant="dock"
            theme={theme}
            onToggle={toggle}
            reduce={reduce}
            compactSize={
              SIZE.compact
            }
          />

          {/* Scroll progress */}
          <motion.span
            aria-hidden
            style={{
              scaleX: progress,
            }}
            className="
              pointer-events-none
              absolute bottom-[3px]
              left-5 right-5
              h-[2px]
              origin-left rounded-full
              bg-neutral-900/40
              dark:bg-white/60
            "
          />
        </motion.nav>

        {/* ==================================================
            DESKTOP THEME TOGGLE
            ================================================== */}
        <ThemeToggle
          variant="pill"
          theme={theme}
          onToggle={toggle}
          reduce={reduce}
        />
      </div>
    </div>
  );
}