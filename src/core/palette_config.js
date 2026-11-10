/**
 * Chrysanthemum Gold Grid - Palette Configuration
 * Derived from @mwdharmaaa profile theme and Chrysanthemum Prince aesthetic.
 */

const PALETTES = {
  chrysanthemum: {
    id: "chrysanthemum",
    name: "Chrysanthemum Gold (Default)",
    l0: "#16202c",
    l0Border: "#243346",
    l1: "#6a4a1a",
    l2: "#a37226",
    l3: "#dda034",
    l4: "#ffcb47",
    glowColor: "rgba(255, 203, 71, 0.45)",
    textHighlight: "#ffe27a"
  },
  imperialAmber: {
    id: "imperialAmber",
    name: "Imperial Amber",
    l0: "#181d24",
    l0Border: "#2a323d",
    l1: "#5a3a10",
    l2: "#8c5b19",
    l3: "#c78225",
    l4: "#f5a73b",
    glowColor: "rgba(245, 167, 59, 0.45)",
    textHighlight: "#ffd699"
  },
  liquidGold: {
    id: "liquidGold",
    name: "Liquid Gold",
    l0: "#141a22",
    l0Border: "#232e3c",
    l1: "#72531e",
    l2: "#ad7e2c",
    l3: "#e6ab3a",
    l4: "#ffe169",
    glowColor: "rgba(255, 225, 105, 0.55)",
    textHighlight: "#fff1b3"
  }
};

const DEFAULT_SETTINGS = {
  activePalette: "chrysanthemum",
  enableGlow: true,
  glowIntensity: "medium",
  enableHoverAnimation: true,
  enableSound: false
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PALETTES, DEFAULT_SETTINGS };
}
