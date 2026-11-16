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

    const isYinYang = (settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;

    // The concept is strictly separate: Imperial Gold 1K+ Milestone belongs EXCLUSIVELY to Chrysanthemum Gold
    if (isYinYang) {
      this.cleanGrandMilestone(header, container);
      this.injectPlainBadge(header, settings);
      return;
    }

    // Chrysanthemum Gold 1K+ Milestone logic
    const { count, countStr, labelStr } = this.parseContributionCount(header);
    const enableGrand = settings.enableGrand1kMilestone !== false;
    const isGrand1k = isChrysanthemum && enableGrand && count >= 1000;

    const frame = container.closest(".profile-container, #user-profile-frame, .js-yearly-contributions") || container.parentElement;

    if (isGrand1k) {
      header.classList.add("cgg-grand-milestone-header");
      header.setAttribute("data-cgg-milestone", "1k-plus");
      if (frame) {
        frame.setAttribute("data-cgg-milestone", "1k-plus");
      }

      let wrap = header.querySelector(".cgg-grand-count-wrap");
      if (!wrap) {
        let targetNode = null;
        for (const child of header.children) {
          if (!child.classList.contains("cgg-badge") &&
              !child.querySelector("a[href*='settings']") &&
              child.textContent.match(/contributions?/i)) {
            targetNode = child;
            break;
          }
        }

        wrap = document.createElement("span");
        wrap.className = "cgg-grand-count-wrap";
        wrap.innerHTML = `
          <span class="cgg-grand-crown" title="Imperial 1K+ Milestone">👑</span>
          <span class="cgg-grand-count">${countStr}</span>
          <span class="cgg-grand-label">${labelStr}</span>
        `;

        if (targetNode) {
          targetNode.replaceWith(wrap);
        } else {
          let replaced = false;
          header.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.match(/contributions?/i)) {
              node.textContent = "";
              header.insertBefore(wrap, node);
              replaced = true;
            }
          });
          if (!replaced) {
            header.prepend(wrap);
          }
        }
      } else {
        const countEl = wrap.querySelector(".cgg-grand-count");
        const labelEl = wrap.querySelector(".cgg-grand-label");
        if (countEl && countStr) countEl.textContent = countStr;
        if (labelEl && labelStr) labelEl.textContent = labelStr;
      }

      const oldPlainBadge = header.querySelector(".cgg-badge:not(.cgg-badge-grand-1k)");
      if (oldPlainBadge) oldPlainBadge.remove();

      let badge = header.querySelector(".cgg-badge-grand-1k");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cgg-badge cgg-badge-grand-1k";
        badge.title = `Chrysanthemum Imperial Milestone: ${count.toLocaleString()} Contributions`;
        badge.innerHTML = `
          <span class="cgg-badge-grand-sparkle">✦</span>
          <span class="cgg-badge-grand-text">Imperial 1K+</span>
          <span class="cgg-badge-grand-dot"></span>
        `;
        wrap.after(badge);
      }
    } else {
      this.cleanGrandMilestone(header, container);
      this.injectPlainBadge(header, settings);
    }
  },

  injectPlainBadge(header, settings = {}) {
    if (!header) return;
    const isYinYang = (settings.activePalette || "") === "yinYang";
    let badge = header.querySelector(".cgg-badge:not(.cgg-badge-grand-1k)");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = `cgg-badge ${isYinYang ? "cgg-badge-yinyang" : "cgg-badge-gold"}`;
      const dot = document.createElement("span");
      dot.className = "cgg-badge-dot";
      badge.appendChild(dot);
      badge.appendChild(document.createTextNode(isYinYang ? "Yin Yang" : "Gold"));
      header.appendChild(badge);
    } else {
      badge.className = `cgg-badge ${isYinYang ? "cgg-badge-yinyang" : "cgg-badge-gold"}`;
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