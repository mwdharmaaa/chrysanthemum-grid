/**
 * Chrysanthemum Gold Grid - Border Styler
 */
const BorderStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;
    const enabled = isChrysanthemum && settings.enableCrimsonBorders !== false;
    const borderCol = isYinYang ? "#30363d" : (enabled ? "var(--cgg-border-crimson, #b81d42)" : "#30363d");

    const borders = document.querySelectorAll(".BorderGrid-cell, .border-bottom, .border-top, .timeline-comment, .discussion-timeline-actions, hr");
    borders.forEach((el) => {
      el.style.setProperty("border-color", borderCol, "important");
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
      "div[style*='border: 1px solid #30363d']",
      ".js-yearly-contributions .border",
      ".graph-before-activity-overview",
      ".ContributionCalendar",
      ".js-yearly-contributions"
    ];
    const cardBorderCol = isYinYang ? "#30363d" : (enabled ? "var(--cgg-border-crimson, #b81d42)" : "#30363d");
    document.querySelectorAll(cardSelectors.join(", ")).forEach((el) => {
      el.style.setProperty("border-color", cardBorderCol, "important");
      if (isYinYang) {
        el.style.setProperty("box-shadow", "none", "important");
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BorderStyler };
}