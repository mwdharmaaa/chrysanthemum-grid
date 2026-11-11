/**
 * Chrysanthemum Gold Grid - Sparkline Styler
 */
const SparklineStyler = {
  style() {
    const sparklines = document.querySelectorAll("svg.js-highlight-blob, .activity-overview-point, path.js-highlight-blob");
    sparklines.forEach((el) => {
      el.style.stroke = "var(--cgg-accent-primary, #e6c656)";
      if (el.tagName.toLowerCase() === "path" && el.getAttribute("fill") !== "none") {
        el.style.fill = "var(--cgg-accent-glow, rgba(230, 198, 86, 0.25))";
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SparklineStyler };
}
