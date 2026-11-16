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

    // Starred button styling for Yin Yang (Pure White Star instead of yellow/gold)
    const starredSelectors = [
      ".starred .octicon-star",
      ".starred .octicon-star-fill",
      ".starred svg.octicon",
      ".starred .color-fg-yellow",
      ".js-toggler-container.starred .octicon",
      ".js-toggler-container.starred svg",
      ".js-social-container.starred .octicon",
      ".js-social-container.starred svg",
      "[data-status='starred'] .octicon",
      "[data-status='starred'] svg",
      "button[aria-label*='Unstar'] .octicon",
      "button[aria-label*='Unstar'] svg",
      "[aria-label*='Starred'] .octicon",
      "[aria-label*='Starred'] svg",
      "form.starred .octicon",
      "form.starred svg"
    ].join(", ");

    if (isYinYang) {
      document.querySelectorAll(starredSelectors).forEach((star) => {
        star.style.setProperty("fill", "#ffffff", "important");
        star.style.setProperty("color", "#ffffff", "important");
        star.querySelectorAll("path").forEach((p) => {
          p.style.setProperty("fill", "#ffffff", "important");
          p.style.setProperty("color", "#ffffff", "important");
        });
      });
    } else {
      document.querySelectorAll(starredSelectors).forEach((star) => {
        star.style.setProperty("fill", "#eac54f", "important");
        star.style.setProperty("color", "#eac54f", "important");
        star.querySelectorAll("path").forEach((p) => {
          p.style.setProperty("fill", "#eac54f", "important");
          p.style.setProperty("color", "#eac54f", "important");
        });
      });
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ButtonStyler };
}