import {type MouseEvent, useEffect, useState} from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const useThemeAnimation = (durationMs = 420) => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleAnimationTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const isDark = theme === "dark";
    const nextTheme: Theme = isDark ? "light" : "dark";
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });
    transition.ready.then(() => {
      const animationProps = isDark ? [...clipPath].reverse() : clipPath;
      document.documentElement.animate(
        {clipPath: animationProps},
        {
          duration: durationMs,
          easing: "ease-in",
          fill: "both", // ✅ tránh end-state “bật lại” 1 frame
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      );
    });
  };

  return {toggleAnimationTheme, theme};
};

export default useThemeAnimation;
