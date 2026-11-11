/**
 * Chrysanthemum Gold Grid - Container Styler
 */
const ContainerStyler = {
  style(container, settings = {}) {
    if (!container) return;
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = (typeof PALETTES !== "undefined" && PALETTES[paletteKey]) ? PALETTES[paletteKey] : {
      l0: "#16202c",
      l0Border: "#243346",
      l1: "#6a4a1a",
      l2: "#a37226",
      l3: "#dda034",
      l4: "#ffcb47",
      glowColor: "rgba(255, 203, 71, 0.45)",
      textHighlight: "#ffe27a"
    };

    const days = container.querySelectorAll("[data-level]");
    days.forEach((day) => {
      const level = day.getAttribute("data-level");
      if (level === "0") {
        day.style.setProperty("background-color", palette.l0, "important");
        day.style.setProperty("fill", palette.l0, "important");
      } else if (level === "1") {
        day.style.setProperty("background-color", palette.l1, "important");
        day.style.setProperty("fill", palette.l1, "important");
      } else if (level === "2") {
        day.style.setProperty("background-color", palette.l2, "important");
        day.style.setProperty("fill", palette.l2, "important");
      } else if (level === "3") {
        day.style.setProperty("background-color", palette.l3, "important");
        day.style.setProperty("fill", palette.l3, "important");
      } else if (level === "4") {
        day.style.setProperty("background-color", palette.l4, "important");
        day.style.setProperty("fill", palette.l4, "important");
        if (settings.enableGlow) {
          day.style.setProperty("box-shadow", `0 0 6px ${palette.glowColor}`, "important");
        }
      }
    });

    // Style legend squares (Less ... More)
    const legendList = document.querySelectorAll(".ContributionCalendar-label, .legend li, .contrib-legend li");
    legendList.forEach((item) => {
      const bg = item.style.backgroundColor;
      if (bg) {
        item.style.borderColor = palette.l0Border;
      }
    });

    this.injectBadge(container);
  },

  injectBadge(container) {
    const header = container.parentElement?.querySelector("h2");
    if (!header || header.querySelector(".cgg-badge")) return;

    const badge = document.createElement("span");
    badge.className = "cgg-badge";
    badge.title = "Chrysanthemum Gold Theme Active";

    const dot = document.createElement("span");
    dot.className = "cgg-badge-dot";

    badge.appendChild(dot);
    badge.appendChild(document.createTextNode("Gold"));
    header.appendChild(badge);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ContainerStyler };
}
