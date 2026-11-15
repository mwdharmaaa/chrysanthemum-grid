/**
 * Chrysanthemum Gold Grid - Button Styler
 */
const ButtonStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const enabled = settings.enableCrimsonButtons !== false;
    const btnBg = isYinYang ? "#ffffff" : (enabled ? "var(--cgg-crimson-base, #8a141e)" : "#238636");
    const btnBorder = isYinYang ? "#ffffff" : (enabled ? "var(--cgg-crimson-bright, #c92a38)" : "rgba(240, 246, 252, 0.1)");
    const btnFg = isYinYang ? "#000000" : "#ffffff";

    const buttons = document.querySelectorAll(".btn-primary, button[type='submit'].btn-primary");
    buttons.forEach((btn) => {
      btn.style.backgroundColor = btnBg;
      btn.style.borderColor = btnBorder;
      btn.style.color = btnFg;
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ButtonStyler };
}
