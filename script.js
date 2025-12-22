// script.js
/**
 * Girl Dinner Tonight - Landing Theme
 * Applies the same tokens as the app to CSS variables.
 *
 * Spec: LIGHT/DARK ONLY (no system mode toggle)
 * - Initial render can respect OS preference if nothing is stored yet.
 * - Once user toggles, we persist explicit "light" or "dark".
 */

const getTheme = (colorScheme) => {
  const isDark = colorScheme === "dark";

  if (isDark) {
    return {
      backgroundPrimary: "#1A1A1A",
      backgroundCard: "#2A2A2A",
      backgroundMuted: "#3A3A3A",

      textPrimary: "#FAF7F2",
      textSecondary: "#CABFB7",
      textMuted: "#8A7F84",

      accentPink: "#F4A7B9",
      accentPinkInk: "#1A1A1A",

      borderMuted: "#3A3A3A",

      shadowLight: "rgba(0, 0, 0, 0.2)",
      shadowStrong: "rgba(0, 0, 0, 0.3)",
      shadowPink: "rgba(244, 167, 185, 0.15)",

      pillBackground: "#3A3A3A",
      pillBorder: "transparent",

      pillSelectedBackground: "#F4A7B9",
      pillSelectedText: "#1A1A1A",

      // IMPORTANT: unselected should NOT be pink in dark mode
      pillUnselectedText: "#CABFB7",

      chipBackground: "#3A3A3A",
      chipSelectedBackground: "#F4A7B9",
      chipSelectedText: "#1A1A1A",
      chipUnselectedText: "#CABFB7",

      surfacePrimary: "#1A1A1A",
      surfaceCard: "#2A2A2A",
      surfaceElevated: "#222222",

      modalOverlay: "rgba(0, 0, 0, 0.55)",
      modalSurface: "#2A2A2A",
    };
  }

  return {
    backgroundPrimary: "#F3E3DB",
    backgroundCard: "#FFF9F5",
    backgroundMuted: "#F7DCD6",

    textPrimary: "#3F2A32",
    textSecondary: "#8A7F84",
    textMuted: "#B7AEB2",

    accentPink: "#F4A7B9",
    accentPinkInk: "#3F2A32",

    borderMuted: "#F4C3CF",

    shadowLight: "rgba(0, 0, 0, 0.03)",
    shadowStrong: "rgba(0, 0, 0, 0.08)",
    shadowPink: "rgba(244, 167, 185, 0.18)",

    pillBackground: "#FFF9F5",
    pillBorder: "rgba(0, 0, 0, 0.04)",

    pillSelectedBackground: "#F4A7B9",
    pillSelectedText: "#3F2A32",

    pillUnselectedText: "#3F2A32",

    chipBackground: "#FFF9F5",
    chipSelectedBackground: "#F4A7B9",
    chipSelectedText: "#3F2A32",
    chipUnselectedText: "#3F2A32",

    surfacePrimary: "#F3E3DB",
    surfaceCard: "#FFF9F5",
    surfaceElevated: "#FFFDFB",

    modalOverlay: "rgba(0, 0, 0, 0.25)",
    modalSurface: "#FFF9F5",
  };
};

const THEME_KEY = "gdt_theme_preference"; // "light" | "dark"

function getInitialScheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setCssVars(themeObj) {
  const root = document.documentElement;

  const keys = [
    "backgroundPrimary",
    "backgroundCard",
    "backgroundMuted",
    "textPrimary",
    "textSecondary",
    "textMuted",
    "accentPink",
    "accentPinkInk",
    "borderMuted",
    "shadowLight",
    "shadowStrong",
    "shadowPink",
    "pillBackground",
    "pillBorder",
    "pillSelectedBackground",
    "pillSelectedText",
    "pillUnselectedText",
    "chipBackground",
    "chipSelectedBackground",
    "chipSelectedText",
    "chipUnselectedText",
    "surfacePrimary",
    "surfaceCard",
    "surfaceElevated",
    "modalOverlay",
    "modalSurface",
  ];

  keys.forEach((k) => {
    if (themeObj[k] != null) root.style.setProperty(`--${k}`, themeObj[k]);
  });

  root.style.colorScheme = currentScheme();
}

function currentScheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return getInitialScheme();
}

function setThemeIcon(scheme) {
  const iconWrap = document.querySelector("#themeToggle .theme-icon");
  const toggle = document.getElementById("themeToggle");
  if (!iconWrap || !toggle) return;

  // aria-pressed true means "dark is active"
  toggle.setAttribute("aria-pressed", scheme === "dark" ? "true" : "false");

  // Inline SVG icon only (no text)
  if (scheme === "dark") {
    // Moon
    iconWrap.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M21 14.5c-1.6.9-3.4 1.3-5.2 1.1-4.1-.4-7.4-3.7-7.8-7.8-.2-1.8.2-3.6 1.1-5.2-4.2 1-7.2 4.8-6.9 9.2.3 4.7 4.2 8.5 8.9 8.9 4.4.3 8.2-2.7 9.2-6.9z"/>
      </svg>
    `;
  } else {
    // Sun
    iconWrap.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-14.5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1V4a1 1 0 0 1-2 0v-.5zM12 20a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0V21a1 1 0 0 1 1-1zm8.5-8a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H20a1 1 0 0 1 0-2h.5zM4 12a1 1 0 0 1-1 1H2.5a1 1 0 0 1 0-2H3a1 1 0 0 1 1 1zm14.1 5.1a1 1 0 0 1 1.4 0l.4.4a1 1 0 0 1-1.4 1.4l-.4-.4a1 1 0 0 1 0-1.4zM5.5 6.5a1 1 0 0 1 1.4 0l.4.4A1 1 0 1 1 5.9 8.3l-.4-.4a1 1 0 0 1 0-1.4zm12.6-1a1 1 0 0 1 0 1.4l-.4.4A1 1 0 1 1 16.3 5.9l.4-.4a1 1 0 0 1 1.4 0zM6.9 17.1a1 1 0 0 1 0 1.4l-.4.4A1 1 0 1 1 5.1 17.5l.4-.4a1 1 0 0 1 1.4 0z"/>
      </svg>
    `;
  }
}

function applyTheme() {
  const scheme = currentScheme();
  const theme = getTheme(scheme);
  setCssVars(theme);
  setThemeIcon(scheme);
}

function toggleTheme() {
  const scheme = currentScheme();
  const next = scheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.addEventListener("click", toggleTheme);
  applyTheme();
});
