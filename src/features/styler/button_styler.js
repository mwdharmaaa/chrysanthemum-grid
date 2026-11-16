/**
 * Chrysanthemum Gold Grid - Button Styler
 */
const ButtonStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;
    const enabled = isChrysanthemum && settings.enableCrimsonButtons !== false;

    const btnBg = isYinYang ? "#ffffff" : (enabled ? "var(--cgg-crimson-base, #8a141e)" : "#238636");
    const btnBorder = isYinYang ? "#ffffff" : (enabled ? "var(--cgg-crimson-bright, #c92a38)" : "rgba(240, 246, 252, 0.1)");
    const btnFg = isYinYang ? "#000000" : "#ffffff";

    const buttons = document.querySelectorAll(".btn-primary, button[type='submit'].btn-primary, a.btn.btn-primary");
    buttons.forEach((btn) => {
      btn.style.setProperty("background-color", btnBg, "important");
      btn.style.setProperty("border-color", btnBorder, "important");
      btn.style.setProperty("color", btnFg, "important");
      btn.querySelectorAll("svg, .octicon, span").forEach((child) => {
        child.style.setProperty("fill", btnFg, "important");
        child.style.setProperty("color", btnFg, "important");
      });
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ButtonStyler };
}