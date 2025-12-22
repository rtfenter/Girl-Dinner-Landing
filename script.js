// script.js
/**
 * Girl Dinner Tonight - Landing Theme
 * Applies the same tokens as the app to CSS variables.
 * Spec: theme toggle is LIGHT/DARK only (no system label/state in UI).
 */

const getTheme = (colorScheme) => {
  const isDark = colorScheme === "dark";

  if (isDark) {
    return {
      darkBackground: "#0F0F0F",
      darkSurface: "#1A1A1A",
      darkOverlay: "#222222",

      backgroundPrimary: "#1A1A1A",
      backgroundCard: "#2A2A2A",
      backgroundMuted: "#3A3A3A",

      textPrimary: "#FAF7F2",
      textSecondary: "#CABFB7",
      textMuted: "#8A7F84",

      accentPink: "#F4A7B9",

      iconDefault: "#F4A7B9",
      iconMuted: "#CABFB7",
      pillBackground: "#3A3A3A",
      pillBorder: "transparent",
      chipBackground: "#3A3A3A",
      moodButtonBackground: "#3A3A3A",

      borderMuted: "#3A3A3A",

      shadowLight: "rgba(0, 0, 0, 0.2)",
      shadowStrong: "rgba(0, 0, 0, 0.3)",
      shadowPink: "rgba(244, 167, 185, 0.15)",

      accentPinkInk: "#1A1A1A",

      pillSelectedBackground: "#F4A7B9",
      pillSelectedText: "#1A1A1A",
      chipSelectedBackground: "#F4A7B9",
      chipSelectedText: "#1A1A1A",
      moodButtonSelectedBackground: "#F4A7B9",
      moodButtonSelectedText: "#1A1A1A",

      pillUnselectedText: "#F4A7B9",
      chipUnselectedText: "#F4A7B9",
      moodButtonUnselectedText: "#F4A7B9",

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

    iconDefault: "#F4A7B9",
    iconMuted: "#C3B8BB",
    pillBackground: "#FFF9F5",
    pillBorder: "rgba(0, 0, 0, 0.04)",

    chipBackground: "#FFF9F5",
    moodButtonBackground: "#FFF9F5",

    borderMuted: "#F4C3CF",

    shadowLight: "rgba(0, 0, 0, 0.03)",
    shadowStrong: "rgba(0, 0, 0, 0.08)",
    shadowPink: "rgba(244, 167, 185, 0.18)",

    accentPinkInk: "#3F2A32",

    pillSelectedBackground: "#F4A7B9",
    pillSelectedText: "#3F2A32",
    chipSelectedBackground: "#F4A7B9",
    chipSelectedText: "#3F2A32",
    moodButtonSelectedBackground: "#F4A7B9",
    moodButtonSelectedText: "#3F2A32",

    pillUnselectedText: "#3F2A32",
    chipUnselectedText: "#3F2A32",
    moodButtonUnselectedText: "#3F2A32",

    surfacePrimary: "#F3E3DB",
    surfaceCard: "#FFF9F5",
    surfaceElevated: "#FFFDFB",

    modalOverlay: "rgba(0, 0, 0, 0.25)",
    modalSurface: "#FFF9F5",
  };
};

const THEME_KEY = "gdt_theme_preference"; // "light" | "dark"

function preferredOrSystemScheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setCssVars(themeObj, scheme) {
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

  // Helps native form controls + scrollbar rendering
  root.style.colorScheme = scheme;
}

function applyTheme() {
  const scheme = preferredOrSystemScheme();
  const theme = getTheme(scheme);
  setCssVars(theme, scheme);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    // Keep the UI label stable per spec; store state via aria-pressed
    toggle.textContent = "Theme";
    toggle.setAttribute("aria-pressed", scheme === "dark" ? "true" : "false");
  }
}

function toggleTheme() {
  const current = preferredOrSystemScheme();
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.addEventListener("click", toggleTheme);

  applyTheme();

  // Only react to OS changes if the user has NOT set a preference yet
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== "light" && stored !== "dark") applyTheme();
  });
});
