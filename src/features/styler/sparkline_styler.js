/**
 * Chrysanthemum Gold Grid - Sparkline Styler
 */
const SparklineStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const strokeCol = isYinYang ? "#ffffff" : "var(--cgg-accent-primary, #e6c656)";
    const fillCol = isYinYang ? "rgba(255, 255, 255, 0.25)" : "var(--cgg-accent-glow, rgba(230, 198, 86, 0.25))";

    const sparklines = document.querySelectorAll("svg.js-highlight-blob, .activity-overview-point, path.js-highlight-blob");
    sparklines.forEach((el) => {
      el.style.stroke = strokeCol;
      if (el.tagName.toLowerCase() === "path" && el.getAttribute("fill") !== "none") {
        el.style.fill = fillCol;
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SparklineStyler };
}
