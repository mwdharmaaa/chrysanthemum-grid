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

    const isYinYang = paletteKey === "yinYang";
    const isChrysanthemum = !isYinYang;

    // 1. Octocat Brand Logo in header
    document.querySelectorAll("svg.octicon-mark-github, .octicon-mark-github, a[aria-label*='Homepage' i] svg").forEach((el) => {
      el.style.setProperty("fill", palette.l4, "important");
      el.style.setProperty("color", palette.l4, "important");
      el.setAttribute("data-dm-text", isYinYang ? "yinyang" : "gold");
    });

    // 2. All anchor links, username, and tab labels (exclude buttons and selected items)
    document.querySelectorAll("a, a.AppHeader-context-item, .UnderlineNav-item, .UnderlineNav-item span, span.repo").forEach((el) => {
      if (el.closest(".btn-primary") || el.classList.contains("btn-primary") || el.classList.contains("btn") || el.classList.contains("selected") || el.classList.contains("js-year-link")) return;
      el.style.setProperty("color", palette.textHighlight, "important");
      el.setAttribute("data-dm-text", isYinYang ? "yinyang" : "gold");
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

    // 5. Primary Buttons (White on Black for Yin Yang; Imperial Crimson for Gold if enabled)
    const enableButtons = isChrysanthemum && settings.enableCrimsonButtons !== false;
    const btnBg = isYinYang ? "#ffffff" : (enableButtons ? "#b81d42" : "#238636");
    const btnFg = isYinYang ? "#000000" : "#ffffff";
    const btnBorder = isYinYang ? "#ffffff" : (enableButtons ? "rgba(240, 246, 252, 0.1)" : "rgba(240, 246, 252, 0.1)");

    document.querySelectorAll(".btn-primary, a.btn-primary, button.btn-primary").forEach((btn) => {
      btn.style.setProperty("background-color", btnBg, "important");
      btn.style.setProperty("color", btnFg, "important");
      btn.style.setProperty("border-color", btnBorder, "important");
      btn.querySelectorAll("svg, .octicon, span").forEach((child) => {
        child.style.setProperty("fill", btnFg, "important");
        child.style.setProperty("color", btnFg, "important");
      });
    });

    // 6. Selected & Unselected Filter Items & Year Links
    const filterBg = isYinYang ? "#ffffff" : (enableButtons ? "#b81d42" : "#1f6feb");
    const filterFg = isYinYang ? "#000000" : "#ffffff";

    document.querySelectorAll(".js-year-link, .filter-item, [id^='year-link-'], a[href*='#year-']").forEach((link) => {
      const isSelected = link.classList.contains("selected") || link.getAttribute("aria-current") === "page";
      if (isSelected) {
        link.style.setProperty("background-color", filterBg, "important");
        link.style.setProperty("color", filterFg, "important");
        link.style.setProperty("font-weight", "700", "important");
        link.style.setProperty("text-shadow", isYinYang ? "none" : "0 1px 2px rgba(0, 0, 0, 0.4)", "important");
        link.querySelectorAll("*").forEach((child) => {
          child.style.setProperty("color", filterFg, "important");
          child.style.setProperty("fill", filterFg, "important");
        });
      } else {
        link.style.removeProperty("background-color");
        link.style.removeProperty("box-shadow");
        link.style.removeProperty("text-shadow");
        link.style.setProperty("color", isYinYang ? "#8b949e" : "var(--cgg-text-highlight, #ffe27a)", "important");
        link.style.setProperty("font-weight", "600", "important");
        link.querySelectorAll("*").forEach((child) => {
          child.style.setProperty("color", isYinYang ? "#8b949e" : "var(--cgg-text-highlight, #ffe27a)", "important");
        });
      }
    });

    // Clean up any repository commit pills (1K+ milestone is strictly for daily commits in tooltip)
    this.styleRepoCommits(settings);
  },

  styleRepoCommits(settings = {}) {
    document.querySelectorAll(".cgg-repo-1k-commit-pill").forEach((pill) => pill.remove());
    document.querySelectorAll(".cgg-commit-grand-1k").forEach((el) => el.classList.remove("cgg-commit-grand-1k"));
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TypographyStyler };
}