/**
 * Chrysanthemum Gold Grid - Navigation Styler
 */
const NavigationStyler = {
  style() {
    const navItems = document.querySelectorAll(".UnderlineNav-item.selected, .js-year-link.selected");
    navItems.forEach((el) => {
      el.style.borderBottomColor = "var(--cgg-crimson-bright, #c92a38)";
      el.style.color = "var(--cgg-crimson-bright, #c92a38)";
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NavigationStyler };
}
