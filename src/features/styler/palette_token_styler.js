/**
 * Chrysanthemum Gold Grid - Palette Token Styler
 */
const PaletteTokenStyler = {
  apply(settings = {}) {
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = (typeof PALETTES !== "undefined" && PALETTES[paletteKey]) ? PALETTES[paletteKey] : {
      l0: "#16202c",
      l0Border: "#243346",
      l1: "#6a4a1a",
      l2: "#a37226",
      l3: "#dda034",
      l4: "#ffcb47",
      glowColor: "rgba(255, 203, 71, 0.45)",
      textHighlight: "#ffe27a"
    };
    const root = document.documentElement;

    root.style.setProperty("--cgg-l0", palette.l0);
    root.style.setProperty("--cgg-l0-border", palette.l0Border);
    root.style.setProperty("--cgg-l1", palette.l1);
    root.style.setProperty("--cgg-l2", palette.l2);
    root.style.setProperty("--cgg-l3", palette.l3);
    root.style.setProperty("--cgg-l4", palette.l4);
    root.style.setProperty("--cgg-glow", settings.enableGlow ? palette.glowColor : "transparent");
    root.style.setProperty("--cgg-text-highlight", palette.textHighlight);

    // GitHub native variables
    root.style.setProperty("--color-calendar-graph-day-bg", palette.l0);
    root.style.setProperty("--color-calendar-graph-day-border", palette.l0Border);
    root.style.setProperty("--color-calendar-graph-day-L1-bg", palette.l1);
    root.style.setProperty("--color-calendar-graph-day-L2-bg", palette.l2);
    root.style.setProperty("--color-calendar-graph-day-L3-bg", palette.l3);
    root.style.setProperty("--color-calendar-graph-day-L4-bg", palette.l4);

    // Contribution and Sparkline tokens
    root.style.setProperty("--contribution-default-bgColor-0", palette.l0);
    root.style.setProperty("--contribution-default-borderColor-0", palette.l0Border);
    root.style.setProperty("--contribution-default-bgColor-1", palette.l1);
    root.style.setProperty("--contribution-default-borderColor-1", palette.l1);
    root.style.setProperty("--contribution-default-bgColor-2", palette.l2);
    root.style.setProperty("--contribution-default-borderColor-2", palette.l2);
    root.style.setProperty("--contribution-default-bgColor-3", palette.l3);
    root.style.setProperty("--contribution-default-borderColor-3", palette.l3);
    root.style.setProperty("--contribution-default-bgColor-4", palette.l4);
    root.style.setProperty("--contribution-default-borderColor-4", palette.l4);

    // Accent typography and link overrides
    root.style.setProperty("--fgColor-accent", palette.textHighlight);
    root.style.setProperty("--color-accent-fg", palette.textHighlight);
    root.style.setProperty("--color-fg-accent", palette.textHighlight);
    root.style.setProperty("--color-accent-emphasis", palette.l3);

    // Feature flag states
    const enableBorders = settings.enableCrimsonBorders !== false;
    const enableButtons = settings.enableCrimsonButtons !== false;
    const enableWings = settings.enableWingedTooltip !== false;
    const enableHover = settings.enableHoverAnimation !== false;

    root.setAttribute("data-cgg-borders", enableBorders ? "true" : "false");
    root.setAttribute("data-cgg-buttons", enableButtons ? "true" : "false");
    root.setAttribute("data-cgg-wings", enableWings ? "true" : "false");
    root.setAttribute("data-cgg-hover", enableHover ? "true" : "false");

    // Primary action button crimson overrides
    const btnBg = enableButtons ? "#b81d42" : "#238636";
    const btnHover = enableButtons ? "#c42045" : "#2ea043";
    const btnActive = enableButtons ? "#8a122e" : "#1f7a31";
    root.style.setProperty("--cgg-crimson", btnBg);
    root.style.setProperty("--cgg-crimson-hover", btnHover);
    root.style.setProperty("--cgg-crimson-active", btnActive);
    root.style.setProperty("--button-primary-bgColor-rest", btnBg);
    root.style.setProperty("--button-primary-bgColor-hover", btnHover);
    root.style.setProperty("--button-primary-bgColor-active", btnActive);
    root.style.setProperty("--button-primary-fgColor-rest", "#ffffff");
    root.style.setProperty("--bgColor-accent-emphasis", btnBg);

    // Imperial Crimson border and divider tokens
    const borderColor = enableBorders ? "#b81d42" : "#30363d";
    const borderMuted = enableBorders ? "#8a122e" : "#21262d";
    root.style.setProperty("--cgg-border-crimson", borderColor);
    root.style.setProperty("--cgg-border-crimson-muted", borderMuted);
    root.style.setProperty("--borderColor-default", borderColor);
    root.style.setProperty("--borderColor-muted", borderColor);
    root.style.setProperty("--borderColor-subtle", borderMuted);
    root.style.setProperty("--color-border-default", borderColor);
    root.style.setProperty("--color-border-muted", borderColor);
    root.style.setProperty("--color-border-subtle", borderMuted);
    root.style.setProperty("--dm-border", borderColor);
    root.style.setProperty("--dm-border-bright", borderColor);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PaletteTokenStyler };
}
