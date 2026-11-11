/**
 * Chrysanthemum Gold Grid - Border Styler
 */
const BorderStyler = {
  style() {
    const borders = document.querySelectorAll(".BorderGrid-cell, .border-bottom, .timeline-comment, .discussion-timeline-actions");
    borders.forEach((el) => {
      el.style.borderColor = "var(--cgg-border-crimson, rgba(163, 29, 39, 0.45))";
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BorderStyler };
}
