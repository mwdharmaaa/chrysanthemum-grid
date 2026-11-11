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

    // Contribution and Sparkline tokens
    root.style.setProperty("--contribution-default-bgColor-0", palette.l0);
    root.style.setProperty("--contribution-default-borderColor-0", palette.l0Border);
    root.style.setProperty("--contribution-default-bgColor-1", palette.l1);
    root.style.setProperty("--contribution-default-borderColor-1", palette.l1);
    root.style.setProperty("--contribution-default-bgColor-2", palette.l2);
    root.style.setProperty("--contribution-default-borderColor-2", palette.l2);
    root.style.setProperty("--contribution-default-bgColor-3", palette.l3);
    root.style.setProperty("--contribution-default-borderColor-3", palette.l3);
    root.style.setProperty("--contribution-default-bgColor-4", palette.l4);
    root.style.setProperty("--contribution-default-borderColor-4", palette.l4);

    // Accent typography and link overrides
    root.style.setProperty("--fgColor-accent", palette.textHighlight);
    root.style.setProperty("--color-accent-fg", palette.textHighlight);
    root.style.setProperty("--color-fg-accent", palette.textHighlight);
    root.style.setProperty("--color-accent-emphasis", palette.l3);

    // Primary action button crimson overrides
    root.style.setProperty("--cgg-crimson", "#b81d42");
    root.style.setProperty("--cgg-crimson-hover", "#c42045");
    root.style.setProperty("--cgg-crimson-active", "#8a122e");
    root.style.setProperty("--button-primary-bgColor-rest", "#b81d42");
    root.style.setProperty("--button-primary-bgColor-hover", "#c42045");
    root.style.setProperty("--button-primary-bgColor-active", "#8a122e");
    root.style.setProperty("--button-primary-fgColor-rest", "#ffffff");
    root.style.setProperty("--bgColor-accent-emphasis", "#b81d42");
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

    // 5. Imperial Crimson Primary Buttons (Avatar Halo Aesthetic)
    document.querySelectorAll(".btn-primary, a.btn-primary, button.btn-primary").forEach((btn) => {
      btn.style.setProperty("background-color", "#b81d42", "important");
      btn.style.setProperty("color", "#ffffff", "important");
      btn.style.setProperty("border-color", "rgba(240, 246, 252, 0.1)", "important");
      btn.querySelectorAll("svg, .octicon, span").forEach((child) => {
        child.style.setProperty("fill", "#ffffff", "important");
        child.style.setProperty("color", "#ffffff", "important");
      });
    });

    // 6. Selected Filter Items & Year Links (Imperial Crimson)
    document.querySelectorAll(".filter-item.selected, a.js-year-link.selected, [id^='year-link-'].selected").forEach((link) => {
      link.style.setProperty("background-color", "#b81d42", "important");
      link.style.setProperty("color", "#ffffff", "important");
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
  },

  styleSparklines(settings) {
    const paletteKey = settings.activePalette || "chrysanthemum";
    const palette = PALETTES[paletteKey] || PALETTES.chrysanthemum;
    const svgs = document.querySelectorAll(".text-right svg, poll-include-fragment svg, svg[width='155'], svg.js-activity-overview-graph");

    svgs.forEach((svg) => {
      svg.querySelectorAll("linearGradient stop").forEach((stop, idx) => {
        const offset = stop.getAttribute("offset") || "";
        const color = offset.startsWith("0") || idx === 0 ? palette.l1 :
                      offset.includes("10") || idx === 1 ? palette.l2 :
                      offset.includes("25") || idx === 2 ? palette.l3 : palette.l4;
        stop.setAttribute("stop-color", color);
        stop.style.setProperty("stop-color", color, "important");
      });

      svg.querySelectorAll("mask polyline, mask path").forEach((el) => {
        el.setAttribute("stroke", "#ffffff");
        el.style.setProperty("stroke", "#ffffff", "important");
      });

      svg.querySelectorAll("polyline:not(mask polyline), path:not(mask path)").forEach((el) => {
        el.setAttribute("stroke", palette.l4);
        el.style.setProperty("stroke", palette.l4, "important");
      });

      if (settings.enableGlow) {
        svg.style.filter = `drop-shadow(0 0 1.5px ${palette.glowColor})`;
      }
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GoldStyler };
}
