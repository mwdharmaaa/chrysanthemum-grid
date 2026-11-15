/**
 * Chrysanthemum Gold Grid - Border Styler
 */
const BorderStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const enabled = settings.enableCrimsonBorders !== false;
    const borderCol = isYinYang ? "#383838" : (enabled ? "var(--cgg-border-crimson, rgba(163, 29, 39, 0.45))" : "#30363d");
    const borders = document.querySelectorAll(".BorderGrid-cell, .border-bottom, .timeline-comment, .discussion-timeline-actions");
    borders.forEach((el) => {
      el.style.borderColor = borderCol;
    });

    const cardSelectors = [
      ".pinned-item-list-item",
      "#user-repositories-list",
      ".Box",
      ".Box-header",
      ".Box-body",
      ".Box-row",
      ".profile-container",
      "#user-profile-frame",
      "header[style*='border']",
      "div[style*='border: 1px solid #30363d']"
    ];
    const cardBorderCol = isYinYang ? "#383838" : (enabled ? "var(--cgg-border-crimson, #b81d42)" : "#30363d");
    document.querySelectorAll(cardSelectors.join(", ")).forEach((el) => {
      el.style.setProperty("border-color", cardBorderCol, "important");
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BorderStyler };
}
