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
  yinYang: {
    id: "yinYang",
    name: "Yin Yang (Monochrome)",
    l0: "#0a0a0a",
    l0Border: "#262626",
    l1: "#383838",
    l2: "#6e6e6e",
    l3: "#aaaaaa",
    l4: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.75)",
    textHighlight: "#ffffff"
  }
};

const DEFAULT_SETTINGS = {
  activePalette: "chrysanthemum",
  enableGlow: true,
  glowIntensity: "medium",
  enableHoverAnimation: true,
  enableCrimsonBorders: true,
  enableWingedTooltip: true,
  enableCrimsonButtons: true,
  enableGrand1kMilestone: true,
  enableSound: false
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PALETTES, DEFAULT_SETTINGS };
}
