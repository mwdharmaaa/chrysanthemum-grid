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
    const isYinYang = paletteKey === "yinYang";
    const isChrysanthemum = !isYinYang;

    root.style.setProperty("--cgg-l0", palette.l0, "important");
    root.style.setProperty("--cgg-l0-border", palette.l0Border, "important");
    root.style.setProperty("--cgg-l1", palette.l1, "important");
    root.style.setProperty("--cgg-l2", palette.l2, "important");
    root.style.setProperty("--cgg-l3", palette.l3, "important");
    root.style.setProperty("--cgg-l4", palette.l4, "important");
    root.style.setProperty("--cgg-glow", settings.enableGlow ? palette.glowColor : "transparent", "important");
    root.style.setProperty("--cgg-text-highlight", palette.textHighlight, "important");

    // GitHub native contribution variables
    root.style.setProperty("--color-calendar-graph-day-bg", palette.l0, "important");
    root.style.setProperty("--color-calendar-graph-day-border", palette.l0Border, "important");
    root.style.setProperty("--color-calendar-graph-day-L1-bg", palette.l1, "important");
    root.style.setProperty("--color-calendar-graph-day-L2-bg", palette.l2, "important");
    root.style.setProperty("--color-calendar-graph-day-L3-bg", palette.l3, "important");
    root.style.setProperty("--color-calendar-graph-day-L4-bg", palette.l4, "important");

    // Contribution and Sparkline tokens
    root.style.setProperty("--contribution-default-bgColor-0", palette.l0, "important");
    root.style.setProperty("--contribution-default-borderColor-0", palette.l0Border, "important");
    root.style.setProperty("--contribution-default-bgColor-1", palette.l1, "important");
    root.style.setProperty("--contribution-default-borderColor-1", palette.l1, "important");
    root.style.setProperty("--contribution-default-bgColor-2", palette.l2, "important");
    root.style.setProperty("--contribution-default-borderColor-2", palette.l2, "important");
    root.style.setProperty("--contribution-default-bgColor-3", palette.l3, "important");
    root.style.setProperty("--contribution-default-borderColor-3", palette.l3, "important");
    root.style.setProperty("--contribution-default-bgColor-4", palette.l4, "important");
    root.style.setProperty("--contribution-default-borderColor-4", palette.l4, "important");

    // Accent typography and link overrides
    root.style.setProperty("--fgColor-accent", palette.textHighlight, "important");
    root.style.setProperty("--color-accent-fg", palette.textHighlight, "important");
    root.style.setProperty("--color-fg-accent", palette.textHighlight, "important");
    root.style.setProperty("--color-accent-emphasis", palette.l3, "important");

    // Feature flags state - Gold features are strictly separated from Yin Yang
    const enableBorders = isChrysanthemum && settings.enableCrimsonBorders !== false;
    const enableButtons = isChrysanthemum && settings.enableCrimsonButtons !== false;
    const enableWings = isChrysanthemum && settings.enableWingedTooltip !== false;
    const enableHover = settings.enableHoverAnimation !== false;

    root.setAttribute("data-cgg-borders", enableBorders ? "true" : "false");
    root.setAttribute("data-cgg-buttons", enableButtons ? "true" : "false");
    root.setAttribute("data-cgg-wings", enableWings ? "true" : "false");
    root.setAttribute("data-cgg-hover", enableHover ? "true" : "false");
    root.setAttribute("data-cgg-theme", paletteKey);

    // Primary action button overrides (Monochrome for Yin Yang, Crimson/primer for Gold)
    const btnBg = isYinYang ? "#ffffff" : (enableButtons ? "#b81d42" : "#238636");
    const btnFg = isYinYang ? "#000000" : "#ffffff";
    const btnHover = isYinYang ? "#e6e6e6" : (enableButtons ? "#c42045" : "#2ea043");
    const btnActive = isYinYang ? "#cccccc" : (enableButtons ? "#8a122e" : "#1f7a31");
    const btnBorder = isYinYang ? "#ffffff" : (enableButtons ? "#c92a38" : "rgba(240, 246, 252, 0.1)");

    root.style.setProperty("--cgg-crimson", btnBg, "important");
    root.style.setProperty("--cgg-crimson-hover", btnHover, "important");
    root.style.setProperty("--cgg-crimson-active", btnActive, "important");
    root.style.setProperty("--cgg-crimson-base", btnBg, "important");
    root.style.setProperty("--cgg-crimson-bright", btnBorder, "important");
    root.style.setProperty("--button-primary-bgColor-rest", btnBg, "important");
    root.style.setProperty("--button-primary-bgColor-hover", btnHover, "important");
    root.style.setProperty("--button-primary-bgColor-active", btnActive, "important");
    root.style.setProperty("--button-primary-fgColor-rest", btnFg, "important");
    root.style.setProperty("--button-primary-borderColor-rest", btnBorder, "important");
    root.style.setProperty("--bgColor-accent-emphasis", btnBg, "important");
    root.style.setProperty("--fgColor-onEmphasis", btnFg, "important");
    root.style.setProperty("--color-fg-on-emphasis", btnFg, "important");

    // Border and divider tokens (Strictly neutral monochrome dark for Yin Yang; Crimson/muted for Gold)
    const borderColor = isYinYang ? "#30363d" : (enableBorders ? "#b81d42" : "#30363d");
    const borderMuted = isYinYang ? "#21262d" : (enableBorders ? "#8a122e" : "#21262d");
    root.style.setProperty("--cgg-border-crimson", borderColor, "important");
    root.style.setProperty("--cgg-border-crimson-muted", borderMuted, "important");
    root.style.setProperty("--borderColor-default", borderColor, "important");
    root.style.setProperty("--borderColor-muted", borderColor, "important");
    root.style.setProperty("--borderColor-subtle", borderMuted, "important");
    root.style.setProperty("--color-border-default", borderColor, "important");
    root.style.setProperty("--color-border-muted", borderColor, "important");
    root.style.setProperty("--color-border-subtle", borderMuted, "important");
    root.style.setProperty("--dm-border", borderColor, "important");
    root.style.setProperty("--dm-border-bright", borderColor, "important");

    // Accent line, sparkline, and badge tokens
    root.style.setProperty("--cgg-accent-primary", palette.l4, "important");
    root.style.setProperty("--cgg-accent-glow", palette.glowColor, "important");
    root.style.setProperty("--cgg-badge-bg", isYinYang ? "rgba(255, 255, 255, 0.1)" : "rgba(221, 160, 52, 0.12)", "important");
    root.style.setProperty("--cgg-badge-border", isYinYang ? "rgba(255, 255, 255, 0.35)" : "rgba(221, 160, 52, 0.35)", "important");
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PaletteTokenStyler };
}