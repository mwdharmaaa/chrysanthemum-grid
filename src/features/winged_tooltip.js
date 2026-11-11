/**
 * Chrysanthemum Gold Grid - Winged Tooltip Engine
 * Orchestrates royal gold winged tooltips over contribution squares.
 */

const WingedTooltip = {
  element: null,
  content: null,
  boundCells: new WeakSet(),

  resolveWingAsset(filename) {
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL) {
      return chrome.runtime.getURL(`src/assets/${filename}`);
    }
    return `../src/assets/${filename}`;
  },

  createHostElement() {
    if (this.element && document.body.contains(this.element)) return this.element;

    const host = document.createElement("div");
    host.className = "cgg-winged-tooltip";
    host.id = "cggWingedTooltip";
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = '<span class="cgg-crimson-halo"></span>' +
                     '<span class="cgg-winged-tooltip-wing cgg-winged-tooltip-wing-left"></span>' +
                     '<span class="cgg-winged-tooltip-content"></span>' +
                     '<span class="cgg-winged-tooltip-wing cgg-winged-tooltip-wing-right"></span>';

    document.body.appendChild(host);
    this.element = host;
    this.content = host.querySelector(".cgg-winged-tooltip-content");
    return host;
  },

  formatFallbackText(dayEl) {
    const rawDate = dayEl.getAttribute("data-date");
    const level = parseInt(dayEl.getAttribute("data-level") || "0", 10);
    if (!rawDate) return "Chrysanthemum Contribution Day";

    const dateObj = new Date(rawDate + "T00:00:00");
    const options = { month: "long", day: "numeric" };
    const dateFormatted = dateObj.toLocaleDateString("en-US", options);

    if (level === 0) {
      return `No contributions on ${dateFormatted}.`;
    }
    const countEstimate = level === 1 ? "1 contribution" : `${level * 3} contributions`;
    return `${countEstimate} on ${dateFormatted}.`;
  },

  resolveTooltipText(dayEl) {
    // 1. Check linked GitHub <tool-tip> web component
    const dayId = dayEl.getAttribute("id");
    if (dayId) {
      const linkedTip = document.querySelector(`tool-tip[for="${dayId}"]`);
      if (linkedTip && linkedTip.textContent.trim()) {
        return linkedTip.textContent.trim();
      }
    }

    // 2. Check aria-label or title attributes
    const aria = dayEl.getAttribute("aria-label");
    if (aria && aria.trim()) return aria.trim();

    const title = dayEl.getAttribute("title");
    if (title && title.trim()) return title.trim();

    // 3. Fallback to data-date and data-level calculation
    return this.formatFallbackText(dayEl);
  },

  extractLevel(dayEl, text) {
    const raw = dayEl.getAttribute("data-level");
    if (raw !== null && raw !== undefined && raw !== "") {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        return Math.min(parsed, 4);
      }
    }
    if (text) {
      const lower = text.toLowerCase().trim();
      if (lower.startsWith("no ") || lower.includes("no contribution") || lower.startsWith("0 ")) return 0;
      const match = lower.match(/^(\d+)\s+contribution/);
      if (match) {
        const count = parseInt(match[1], 10);
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 9) return 3;
        return 4;
      }
    }
    return 0;
  },

  hasContributions(dayEl, text) {
    return this.extractLevel(dayEl, text) > 0;
  },

  show(dayEl) {
    this.createHostElement();
    const text = this.resolveTooltipText(dayEl);
    this.content.textContent = text;

    const level = this.extractLevel(dayEl, text);

    // Reset base and assign graduated level class
    this.element.className = `cgg-winged-tooltip cgg-level-${level}`;
    if (level === 3 || level === 4) {
      this.element.classList.add("has-wings");
    }
    if (level === 4) {
      this.element.classList.add("has-halo");
    }

    const rect = dayEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const topY = rect.top;

    this.element.style.left = `${Math.round(centerX)}px`;
    this.element.style.top = `${Math.round(topY)}px`;
    this.element.classList.add("is-active");
  },

  hide() {
    if (this.element) {
      this.element.classList.remove("is-active");
    }
  },

  bindGlobalDelegation() {
    if (this._delegated) return;
    this._delegated = true;

    const getCell = (target) => {
      if (!target || !target.closest) return null;
      return target.closest(".ContributionCalendar-day, [data-level], td[data-date], rect[data-date]");
    };

    document.addEventListener("mouseover", (e) => {
      const cell = getCell(e.target);
      if (cell) this.show(cell);
    }, true);

    document.addEventListener("mouseout", (e) => {
      const cell = getCell(e.target);
      if (cell && (!e.relatedTarget || !cell.contains(e.relatedTarget))) {
        this.hide();
      }
    }, true);

    document.addEventListener("focusin", (e) => {
      const cell = getCell(e.target);
      if (cell) this.show(cell);
    }, true);

    document.addEventListener("focusout", (e) => {
      const cell = getCell(e.target);
      if (cell) this.hide();
    }, true);
  },

  bindDays(container) {
    const root = container || document;
    const days = root.querySelectorAll(".ContributionCalendar-day, [data-level]");

    days.forEach((day) => {
      if (this.boundCells.has(day)) return;
      this.boundCells.add(day);

      day.addEventListener("mouseenter", () => this.show(day));
      day.addEventListener("mouseleave", () => this.hide());
      day.addEventListener("focus", () => this.show(day));
      day.addEventListener("blur", () => this.hide());
    });
  },

  init() {
    const leftUrl = this.resolveWingAsset("wing_left.png");
    const rightUrl = this.resolveWingAsset("wing_right.png");
    document.documentElement.style.setProperty("--cgg-wing-left", `url("${leftUrl}")`);
    document.documentElement.style.setProperty("--cgg-wing-right", `url("${rightUrl}")`);

    this.createHostElement();
    this.bindGlobalDelegation();
    this.bindDays();
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WingedTooltip };
}
