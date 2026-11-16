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

    this.styleHeader(container, settings);
  },

  findHeader(container) {
    if (!container) return null;
    return container.parentElement?.querySelector("h2") ||
           container.closest(".profile-container, #user-profile-frame, .js-yearly-contributions, main, body")?.querySelector("h2") ||
           document.querySelector(".js-yearly-contributions h2, #user-profile-frame h2, .profile-container h2");
  },

  cleanGrandMilestone(header, container) {
    if (!header) return;
    header.classList.remove("cgg-grand-milestone-header");
    header.removeAttribute("data-cgg-milestone");

    const frame = container?.closest?.(".profile-container, #user-profile-frame, .js-yearly-contributions") || container?.parentElement;
    if (frame) {
      frame.removeAttribute("data-cgg-milestone");
    }

    const grandBadge = header.querySelector(".cgg-badge-grand-1k");
    if (grandBadge) grandBadge.remove();

    const wrap = header.querySelector(".cgg-grand-count-wrap");
    if (wrap) {
      const countSpan = wrap.querySelector(".cgg-grand-count");
      const labelSpan = wrap.querySelector(".cgg-grand-label");
      const simpleText = `${countSpan ? countSpan.textContent : ""} ${labelSpan ? labelSpan.textContent : ""}`.trim();
      const span = document.createElement("span");
      span.textContent = simpleText;
      wrap.replaceWith(span);
    }
  },

  styleHeader(container, settings = {}) {
    const header = this.findHeader(container);
    if (!header) return;

    // Clean up any 1K milestone display from the header (1K+ milestone is strictly for daily commits in tooltip)
    this.cleanGrandMilestone(header, container);

    this.injectPlainBadge(header, settings);
  },

  injectPlainBadge(header, settings = {}) {
    if (!header) return;
    const isYinYang = (settings.activePalette || "") === "yinYang";
    let badge = header.querySelector(".cgg-badge:not(.cgg-badge-grand-1k)");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cgg-badge";
      const dot = document.createElement("span");
      dot.className = "cgg-badge-dot";
      badge.appendChild(dot);
      badge.appendChild(document.createTextNode(isYinYang ? "Yin Yang" : "Gold"));
      header.appendChild(badge);
    } else {
      badge.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          n.textContent = isYinYang ? "Yin Yang" : "Gold";
        }
      });
    }
    badge.title = isYinYang ? "Yin Yang Theme Active" : "Chrysanthemum Gold Theme Active";
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ContainerStyler };
}
