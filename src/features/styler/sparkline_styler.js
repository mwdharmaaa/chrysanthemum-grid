/**
 * Chrysanthemum Gold Grid - Sparkline Styler
 */
const SparklineStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const strokeCol = isYinYang ? "#ffffff" : "var(--cgg-l4, #ffcb47)";
    const fillCol = isYinYang ? "rgba(255, 255, 255, 0.25)" : "var(--cgg-accent-glow, rgba(255, 203, 71, 0.25))";

    const sparklines = document.querySelectorAll(
      "svg.js-highlight-blob, .activity-overview-point, path.js-highlight-blob, .text-right svg polyline:not(mask polyline), .text-right svg path:not(mask path), svg.js-activity-overview-graph path, svg.js-activity-overview-graph polyline"
    );
    sparklines.forEach((el) => {
      el.style.setProperty("stroke", strokeCol, "important");
      if (el.tagName.toLowerCase() === "path" && el.getAttribute("fill") && el.getAttribute("fill") !== "none") {
        el.style.setProperty("fill", fillCol, "important");
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SparklineStyler };
}