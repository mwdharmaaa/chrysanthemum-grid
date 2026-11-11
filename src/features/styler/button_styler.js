/**
 * Chrysanthemum Gold Grid - Button Styler
 */
const ButtonStyler = {
  style() {
    const buttons = document.querySelectorAll(".btn-primary, button[type='submit'].btn-primary");
    buttons.forEach((btn) => {
      btn.style.backgroundColor = "var(--cgg-crimson-base, #8a141e)";
      btn.style.borderColor = "var(--cgg-crimson-bright, #c92a38)";
      btn.style.color = "#ffffff";
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ButtonStyler };
}
