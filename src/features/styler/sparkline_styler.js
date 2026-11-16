/**
 * Chrysanthemum Gold Grid - Sparkline Styler
 */
const SparklineStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const strokeCol = isYinYang ? "#ffffff" : "var(--cgg-accent-primary, var(--cgg-l4, #ffcb47))";
    const fillCol = isYinYang ? "#ffffff" : "var(--cgg-accent-glow, rgba(255, 203, 71, 0.25))";

    // 1. Force all linearGradient stops in sparklines to the correct palette color (Pure white for Yin Yang)
    const stops = document.querySelectorAll(
      ".text-right linearGradient stop, svg[width='155'] linearGradient stop, svg.js-activity-overview-graph linearGradient stop, defs linearGradient[id*='gradient'] stop, .sparkline-test linearGradient stop"
    );
    stops.forEach((stop) => {
      stop.setAttribute("stop-color", strokeCol);
      stop.style.setProperty("stop-color", strokeCol, "important");
    });

    // 2. Ensure mask polylines & paths pass full light (pure white stroke in SVG mask)
    const maskLines = document.querySelectorAll(
      "mask polyline, mask path, mask[id*='sparkline'] polyline, mask[id*='sparkline'] path, .text-right mask polyline, .text-right mask path"
    );
    maskLines.forEach((line) => {
      line.setAttribute("stroke", "#ffffff");
      line.style.setProperty("stroke", "#ffffff", "important");
    });

    // 3. Rectangles with mask or fill (In Yin Yang, fill with pure white)
    const rects = document.querySelectorAll(
      ".text-right svg rect, svg[width='155'] rect, .sparkline-test rect"
    );
    rects.forEach((rect) => {
      if (isYinYang) {
        rect.style.setProperty("fill", "#ffffff", "important");
      } else {
        rect.style.removeProperty("fill");
      }
    });

    // 4. Standalone sparkline paths, polylines, and highlight blobs
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