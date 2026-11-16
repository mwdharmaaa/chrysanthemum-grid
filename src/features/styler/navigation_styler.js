/**
 * Chrysanthemum Gold Grid - Navigation Styler
 */
const NavigationStyler = {
  style(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;
    const enabled = isChrysanthemum && settings.enableCrimsonButtons !== false;

    const navItems = document.querySelectorAll(".UnderlineNav-item.selected, .js-year-link.selected");
    navItems.forEach((el) => {
      if (isYinYang) {
        el.style.setProperty("border-bottom-color", "#ffffff", "important");
        el.style.setProperty("color", "#ffffff", "important");
      } else {
        const crimson = enabled ? "var(--cgg-crimson-bright, #c92a38)" : "var(--cgg-l3, #dda034)";
        el.style.setProperty("border-bottom-color", crimson, "important");
        el.style.setProperty("color", crimson, "important");
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NavigationStyler };
}