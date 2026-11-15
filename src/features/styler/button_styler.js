/**
 * Chrysanthemum Gold Grid - Button Styler
 */
const ButtonStyler = {
  style(settings = {}) {
    const enabled = settings.enableCrimsonButtons !== false;
    const buttons = document.querySelectorAll(".btn-primary, button[type='submit'].btn-primary");
    buttons.forEach((btn) => {
      btn.style.backgroundColor = enabled ? "var(--cgg-crimson-base, #8a141e)" : "#238636";
      btn.style.borderColor = enabled ? "var(--cgg-crimson-bright, #c92a38)" : "rgba(240, 246, 252, 0.1)";
      btn.style.color = "#ffffff";
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ButtonStyler };
}
