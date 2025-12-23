// script.js
// Theme + token application (icon-only toggle)
// CHANGE: default to LIGHT unless user explicitly chose dark

const THEME_KEY = "gdt_theme"; // "light" | "dark"

const lightTokens = {
  backgroundPrimary: "#F3E3DB",
  backgroundCard: "#FFF9F5",
  backgroundMuted: "#F7DCD6",

  textPrimary: "#3F2A32",
  textSecondary: "#8A7F84",
  textMuted: "#B7AEB2",

  accentPink: "#F4A7B9",
  accentPinkInk: "#3F2A32",

  borderMuted: "#F4C3CF",

  shadowLight: "rgba(0,0,0,0.03)",
  shadowStrong: "rgba(0,0,0,0.08)",
  shadowPink: "rgba(244,167,185,0.18)",

  pillBackground: "#FFF9F5",
  pillBorder: "rgba(0,0,0,0.04)",

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

  modalOverlay: "rgba(0,0,0,0.25)",
  modalSurface: "#FFF9F5",
};

const darkTokens = {
  backgroundPrimary: "#1A1A1A",
  backgroundCard: "#2A2A2A",
  backgroundMuted: "#3A3A3A",

  textPrimary: "#FAF7F2",
  textSecondary: "#CABFB7",
  textMuted: "#8A7F84",

  accentPink: "#F4A7B9",
  accentPinkInk: "#1A1A1A",

  borderMuted: "#3A3A3A",

  shadowLight: "rgba(0,0,0,0.20)",
  shadowStrong: "rgba(0,0,0,0.30)",
  shadowPink: "rgba(244,167,185,0.15)",

  pillBackground: "#3A3A3A",
  pillBorder: "transparent",

  pillSelectedBackground: "#F4A7B9",
  pillSelectedText: "#1A1A1A",
  pillUnselectedText: "#F4A7B9",

  chipBackground: "#3A3A3A",
  chipSelectedBackground: "#F4A7B9",
  chipSelectedText: "#1A1A1A",
  chipUnselectedText: "#F4A7B9",

  surfacePrimary: "#1A1A1A",
  surfaceCard: "#2A2A2A",
  surfaceElevated: "#222222",

  modalOverlay: "rgba(0,0,0,0.55)",
  modalSurface: "#2A2A2A",
};

function setCSSVars(tokens) {
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

function sunIcon() {
  return `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
      stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function moonIcon() {
  return `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21 13.2A8.5 8.5 0 0 1 10.8 3a6.5 6.5 0 1 0 10.2 10.2Z"
      stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  </svg>`;
}

function applyTheme(theme) {
  const btn = document.getElementById("themeToggle");
  const iconWrap = btn?.querySelector(".theme-icon");

  if (theme === "dark") {
    setCSSVars(darkTokens);
    document.documentElement.dataset.theme = "dark";
    btn?.setAttribute("aria-pressed", "true");
    if (iconWrap) iconWrap.innerHTML = sunIcon(); // show sun when currently dark
  } else {
    setCSSVars(lightTokens);
    document.documentElement.dataset.theme = "light";
    btn?.setAttribute("aria-pressed", "false");
    if (iconWrap) iconWrap.innerHTML = moonIcon(); // show moon when currently light
  }
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;

  // CHANGE: default to LIGHT (so it looks like the app out of the box)
  return "light";
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

(function init() {
  applyTheme(getInitialTheme());

  const btn = document.getElementById("themeToggle");
  btn?.addEventListener("click", toggleTheme);
})();
