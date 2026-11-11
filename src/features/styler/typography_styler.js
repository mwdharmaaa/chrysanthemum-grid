/**
 * Chrysanthemum Gold Grid - Typography & Brand Styler
 */
const TypographyStyler = {
  style(settings = {}) {
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = (typeof PALETTES !== "undefined" && PALETTES[paletteKey]) ? PALETTES[paletteKey] : {
      l3: "#dda034",
      l4: "#ffcb47",
      textHighlight: "#ffe27a"
    };

    // 1. Octocat Brand Logo in header
    document.querySelectorAll("svg.octicon-mark-github, .octicon-mark-github, a[aria-label*='Homepage' i] svg").forEach((el) => {
      el.style.setProperty("fill", palette.l4, "important");
      el.style.setProperty("color", palette.l4, "important");
      el.setAttribute("data-dm-text", "gold");
    });

    // 2. All anchor links, username, and tab labels (exclude buttons and selected items)
    document.querySelectorAll("a, a.AppHeader-context-item, .UnderlineNav-item, .UnderlineNav-item span, span.repo").forEach((el) => {
      if (el.closest(".btn-primary") || el.classList.contains("btn-primary") || el.classList.contains("btn") || el.classList.contains("selected")) return;
      el.style.setProperty("color", palette.textHighlight, "important");
      el.setAttribute("data-dm-text", "gold");
    });

    // 3. UnderlineNav tab icons
    document.querySelectorAll(".UnderlineNav-item svg, .UnderlineNav-item .octicon").forEach((el) => {
      el.style.setProperty("fill", palette.l3, "important");
      el.style.setProperty("color", palette.l3, "important");
    });

    // 4. Tab active underline indicator
    document.querySelectorAll(".UnderlineNav-item[aria-current='page'], .UnderlineNav-item.selected").forEach((el) => {
      el.style.setProperty("border-bottom-color", palette.l3, "important");
      el.style.setProperty("color", palette.l4, "important");
    });

    // 5. Imperial Crimson Primary Buttons
    document.querySelectorAll(".btn-primary, a.btn-primary, button.btn-primary").forEach((btn) => {
      btn.style.setProperty("background-color", "#b81d42", "important");
      btn.style.setProperty("color", "#ffffff", "important");
      btn.style.setProperty("border-color", "rgba(240, 246, 252, 0.1)", "important");
      btn.querySelectorAll("svg, .octicon, span").forEach((child) => {
        child.style.setProperty("fill", "#ffffff", "important");
        child.style.setProperty("color", "#ffffff", "important");
      });
    });

    // 6. Selected Filter Items & Year Links
    document.querySelectorAll(".filter-item.selected, a.js-year-link.selected, [id^='year-link-'].selected").forEach((link) => {
      link.style.setProperty("background-color", "#b81d42", "important");
      link.style.setProperty("color", "#ffffff", "important");
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TypographyStyler };
}
