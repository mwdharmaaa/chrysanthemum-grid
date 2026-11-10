/**
 * Chrysanthemum Gold Grid - Gold Styler Engine
 * Applies gold palette tokens and custom styling to calendar elements.
 */

const GoldStyler = {
  applyPaletteTokens(settings) {
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = PALETTES[paletteKey] || PALETTES.chrysanthemum;
    const root = document.documentElement;

    root.style.setProperty("--cgg-l0", palette.l0);
    root.style.setProperty("--cgg-l0-border", palette.l0Border);
    root.style.setProperty("--cgg-l1", palette.l1);
    root.style.setProperty("--cgg-l2", palette.l2);
    root.style.setProperty("--cgg-l3", palette.l3);
    root.style.setProperty("--cgg-l4", palette.l4);
    root.style.setProperty("--cgg-glow", settings.enableGlow ? palette.glowColor : "transparent");
    root.style.setProperty("--cgg-text-highlight", palette.textHighlight);

    // Also override GitHub native variables if exposed
    root.style.setProperty("--color-calendar-graph-day-bg", palette.l0);
    root.style.setProperty("--color-calendar-graph-day-border", palette.l0Border);
    root.style.setProperty("--color-calendar-graph-day-L1-bg", palette.l1);
    root.style.setProperty("--color-calendar-graph-day-L2-bg", palette.l2);
    root.style.setProperty("--color-calendar-graph-day-L3-bg", palette.l3);
    root.style.setProperty("--color-calendar-graph-day-L4-bg", palette.l4);

    // Accent typography and link overrides
    root.style.setProperty("--fgColor-accent", palette.textHighlight);
    root.style.setProperty("--color-accent-fg", palette.textHighlight);
    root.style.setProperty("--color-fg-accent", palette.textHighlight);
    root.style.setProperty("--color-accent-emphasis", palette.l3);
  },

  styleContainer(container, settings) {
    if (!container) return;
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = PALETTES[paletteKey] || PALETTES.chrysanthemum;

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

    this.injectBadge(container);
  },

  styleTypography(settings) {
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = PALETTES[paletteKey] || PALETTES.chrysanthemum;

    // 1. Octocat Brand Logo in header
    document.querySelectorAll("svg.octicon-mark-github, .octicon-mark-github, a[aria-label*='Homepage' i] svg").forEach((el) => {
      el.style.setProperty("fill", palette.l4, "important");
      el.style.setProperty("color", palette.l4, "important");
      el.setAttribute("data-dm-text", "gold");
    });

    // 2. All anchor links, username, and tab labels (exempt from dark-mana)
    document.querySelectorAll("a, a.AppHeader-context-item, .UnderlineNav-item, .UnderlineNav-item span, span.repo").forEach((el) => {
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
  module.exports = { GoldStyler };
}
