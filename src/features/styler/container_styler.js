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

    const isYinYang = (settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;
    const enableGrand = isChrysanthemum && settings.enableGrand1kMilestone !== false;

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

      // Check if this day is a grand 1K+ daily commit
      if (enableGrand && typeof TooltipLevelExtractor !== "undefined" && typeof TooltipTextFormatter !== "undefined") {
        const text = TooltipTextFormatter.resolve(day);
        const count = TooltipLevelExtractor.extractCount(day, text);
        if (count >= 1000) {
          day.classList.add("cgg-grand-1k-day");
          if (settings.enableGlow) {
            day.style.setProperty("box-shadow", "0 0 10px rgba(255, 203, 71, 0.95), 0 0 4px #b81d42", "important");
          }
        } else {
          day.classList.remove("cgg-grand-1k-day");
        }
      } else {
        day.classList.remove("cgg-grand-1k-day");
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

  parseContributionCount(header) {
    if (!header) return { count: 0, countStr: "", labelStr: "" };
    const grandCountEl = header.querySelector(".cgg-grand-count");
    if (grandCountEl) {
      const countStr = grandCountEl.textContent.trim();
      const labelEl = header.querySelector(".cgg-grand-label");
      const labelStr = labelEl ? labelEl.textContent.trim() : "contributions in the last year";
      const cleanNum = countStr.replace(/[,.]/g, "");
      const count = parseInt(cleanNum, 10) || 0;
      return { count, countStr, labelStr };
    }
    const text = header.textContent || "";
    const match = text.match(/([\d,.]+)\+?\s+(contributions?.*)/i);
    if (match) {
      const countStr = match[1];
      const cleanNum = countStr.replace(/[,.]/g, "");
      const count = parseInt(cleanNum, 10) || 0;
      let labelStr = match[2].trim();
      labelStr = labelStr.replace(/Contribution settings.*$/i, "").trim();
      return { count, countStr, labelStr };
    }
    return { count: 0, countStr: "", labelStr: "" };
  },

  cleanGrandMilestone(header, container) {
    document.querySelectorAll("[data-cgg-milestone]").forEach((el) => {
      el.removeAttribute("data-cgg-milestone");
    });
    document.querySelectorAll(".cgg-grand-milestone-header").forEach((el) => {
      el.classList.remove("cgg-grand-milestone-header");
    });
    document.querySelectorAll(".cgg-badge-grand-1k").forEach((el) => {
      el.remove();
    });
    document.querySelectorAll(".cgg-grand-crown").forEach((el) => {
      el.remove();
    });

    const frame = container?.closest?.(".profile-container, #user-profile-frame, .js-yearly-contributions") || container?.parentElement;
    if (frame) {
      frame.removeAttribute("data-cgg-milestone");
    }

    document.querySelectorAll(".cgg-grand-count-wrap").forEach((wrap) => {
      const countSpan = wrap.querySelector(".cgg-grand-count");
      const labelSpan = wrap.querySelector(".cgg-grand-label");
      const simpleText = `${countSpan ? countSpan.textContent : ""} ${labelSpan ? labelSpan.textContent : ""}`.trim();
      const span = document.createElement("span");
      span.textContent = simpleText;
      wrap.replaceWith(span);
    });

    if (header) {
      header.classList.remove("cgg-grand-milestone-header");
      header.removeAttribute("data-cgg-milestone");
    }
  },

  styleHeader(container, settings = {}) {
    const header = this.findHeader(container);
    if (!header) return;

    // Clean up any 1K milestone display from the header (1K+ milestone is strictly for daily commits in tooltip)
    this.cleanGrandMilestone(header, container);

    const isYinYang = (settings.activePalette || "") === "yinYang";
    if (isYinYang) {
      // In Yin Yang, remove all badges completely (no "Yin Yang" badge, no gold badge)
      header.querySelectorAll(".cgg-badge").forEach((b) => b.remove());
      document.querySelectorAll(".cgg-badge").forEach((b) => b.remove());
      return;
    }

    // In Chrysanthemum Gold, retain the classic clean Gold badge
    this.injectPlainBadge(header, settings);
  },

  injectBadge(container, settings = {}) {
    const header = this.findHeader(container);
    if (header) {
      this.injectPlainBadge(header, settings);
    }
  },

  injectPlainBadge(header, settings = {}) {
    if (!header) return;
    const isYinYang = (settings.activePalette || "") === "yinYang";
    if (isYinYang) {
      header.querySelectorAll(".cgg-badge").forEach((b) => b.remove());
      document.querySelectorAll(".cgg-badge").forEach((b) => b.remove());
      return;
    }
    let badge = header.querySelector(".cgg-badge:not(.cgg-badge-grand-1k)");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cgg-badge cgg-badge-gold";
      const dot = document.createElement("span");
      dot.className = "cgg-badge-dot";
      badge.appendChild(dot);
      badge.appendChild(document.createTextNode("Gold"));
      header.appendChild(badge);
    } else {
      badge.className = "cgg-badge cgg-badge-gold";
      badge.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          n.textContent = "Gold";
        }
      });
    }
    badge.title = "Chrysanthemum Gold Theme Active";
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ContainerStyler };
}