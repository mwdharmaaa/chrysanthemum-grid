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
      if (el.closest(".btn-primary") || el.classList.contains("btn-primary") || el.classList.contains("btn") || el.classList.contains("selected")) return;
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

    // 6. Selected Filter Items & Year Links
    const filterBg = isYinYang ? "#ffffff" : (enableButtons ? "#b81d42" : "#1f6feb");
    const filterFg = isYinYang ? "#000000" : "#ffffff";
    document.querySelectorAll(".filter-item.selected, a.js-year-link.selected, [id^='year-link-'].selected").forEach((link) => {
      link.style.setProperty("background-color", filterBg, "important");
      link.style.setProperty("color", filterFg, "important");
    });

    // 7. Repository Commit Counters (Grand 1K+ Commits - Chrysanthemum Gold Exclusive)
    this.styleRepoCommits(settings);
  },

  styleRepoCommits(settings = {}) {
    const isYinYang = (settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;
    const enableGrand = isChrysanthemum && settings.enableGrand1kMilestone !== false;

    document.querySelectorAll("a[href*='/commits'], .commits a").forEach((el) => {
      const pill = el.querySelector(".cgg-repo-1k-commit-pill");
      if (isYinYang) {
        el.classList.remove("cgg-commit-grand-1k");
        if (pill) pill.remove();
        return;
      }

      const text = el.textContent || "";
      const match = text.match(/([\d,.]+)\s+commits?/i);
      if (match) {
        const cleanNum = match[1].replace(/[,.]/g, "");
        const count = parseInt(cleanNum, 10) || 0;
        if (count >= 1000 && enableGrand) {
          el.classList.add("cgg-commit-grand-1k");
          if (!pill) {
            const newPill = document.createElement("span");
            newPill.className = "cgg-repo-1k-commit-pill";
            newPill.innerHTML = `<span class="cgg-repo-crown">👑</span> 1K+`;
            el.appendChild(newPill);
          }
        } else {
          el.classList.remove("cgg-commit-grand-1k");
          if (pill) pill.remove();
        }
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TypographyStyler };
}