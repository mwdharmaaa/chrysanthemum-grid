/**
 * Chrysanthemum Gold Grid - Border Styler
 */
const BorderStyler = {
  style(settings = {}) {
    const enabled = settings.enableCrimsonBorders !== false;
    const borders = document.querySelectorAll(".BorderGrid-cell, .border-bottom, .timeline-comment, .discussion-timeline-actions");
    borders.forEach((el) => {
      el.style.borderColor = enabled ? "var(--cgg-border-crimson, rgba(163, 29, 39, 0.45))" : "#30363d";
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
    document.querySelectorAll(cardSelectors.join(", ")).forEach((el) => {
      if (!enabled) {
        el.style.setProperty("border-color", "#30363d", "important");
      } else {
        el.style.setProperty("border-color", "var(--cgg-border-crimson, #b81d42)", "important");
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BorderStyler };
}
