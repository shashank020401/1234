// src/hooks/useTheme.js
//
// Dark/light theme with:
//  - saved choice (localStorage), falling back to the system setting
//  - a "dark" class on <html> that Tailwind's dark: variant reads
//  - a circular reveal from the toggle button (View Transitions API),
//    with a plain instant switch where that isn't supported

import { useCallback, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";

const KEY = "theme";

const getInitial = () => {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function useTheme() {
  const [theme, setTheme] = useState(getInitial);

  // Layout effect so the class is on <html> before the browser paints
  // (and before the view-transition snapshot is taken)
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback(
    async (e) => {
      const next = theme === "dark" ? "light" : "dark";

      const apply = () => {
        setTheme(next);
        try {
          localStorage.setItem(KEY, next);
        } catch {
          /* ignore */
        }
      };

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!document.startViewTransition || reduce) {
        apply();
        return;
      }

      // Centre of the button (also correct for keyboard activation)
      const rect = e?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(apply);
      });

      try {
        await transition.ready;
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      } catch {
        /* transition was skipped: the theme is already applied */
      }
    },
    [theme]
  );

  return { theme, toggle };
}