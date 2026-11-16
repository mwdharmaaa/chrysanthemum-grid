/**
 * Chrysanthemum Gold Grid - Winged Tooltip Engine Facade
 */
const WingedTooltip = {
  get element() {
    return TooltipHost.element;
  },
  get content() {
    return TooltipHost.content;
  },

  resolveWingAsset(filename) {
    return TooltipAssetResolver.resolve(filename);
  },

  createHostElement() {
    return TooltipHost.create();
  },

  formatFallbackText(dayEl) {
    return TooltipTextFormatter.formatFallback(dayEl);
  },

  resolveTooltipText(dayEl) {
    return TooltipTextFormatter.resolve(dayEl);
  },

  extractLevel(dayEl, text) {
    return TooltipLevelExtractor.extract(dayEl, text);
  },

  hasContributions(dayEl, text) {
    return TooltipLevelExtractor.hasContributions(dayEl, text);
  },

  settings: {},

  show(dayEl) {
    const isYinYang = (this.settings.activePalette || "") === "yinYang";
    const isChrysanthemum = !isYinYang;

    const host = TooltipHost.create();
    const content = TooltipHost.getContentElement();
    const text = TooltipTextFormatter.resolve(dayEl);
    content.textContent = text;

    const level = TooltipLevelExtractor.extract(dayEl, text);
    const count = typeof TooltipLevelExtractor.extractCount === "function" ? TooltipLevelExtractor.extractCount(dayEl, text) : 0;
    const isGrand1k = isChrysanthemum && (this.settings.enableGrand1kMilestone !== false) && count >= 1000;
    const enableWings = isChrysanthemum && (this.settings.enableWingedTooltip !== false);

    // Reset old classes
    host.className = `cgg-winged-tooltip cgg-level-${level}`;

    if (isYinYang) {
      host.classList.add("cgg-tooltip-yinyang");
    } else {
      if (enableWings && (level === 3 || level === 4 || isGrand1k)) {
        host.classList.add("has-wings");
      }
      if (enableWings && (level === 4 || isGrand1k)) {
        host.classList.add("has-halo");
      }
      if (isGrand1k) {
        host.classList.add("cgg-grand-1k-tooltip");
        const crown = document.createElement("span");
        crown.className = "cgg-tooltip-crown";
        crown.textContent = "👑 ";
        content.prepend(crown);

        const badge = document.createElement("span");
        badge.className = "cgg-tooltip-grand-badge";
        badge.innerHTML = ` <span class="cgg-tooltip-sparkle">✦</span> Imperial 1K+`;
        content.appendChild(badge);
      }
    }

    const coords = TooltipPositioner.compute(dayEl);
    TooltipPositioner.apply(host, coords);
    host.classList.add("is-active");
  },

  hide() {
    const el = TooltipHost.element;
    if (el) {
      el.classList.remove("is-active");
    }
  },

  bindGlobalDelegation() {
    TooltipEventDelegator.bindGlobal(
      (dayEl) => this.show(dayEl),
      () => this.hide()
    );
  },

  bindDays(container) {
    TooltipEventDelegator.bindElements(
      container,
      (dayEl) => this.show(dayEl),
      () => this.hide()
    );
  },

  init(settings = {}) {
    this.settings = settings;
    const leftUrl = TooltipAssetResolver.resolve("wing_left.png");
    const rightUrl = TooltipAssetResolver.resolve("wing_right.png");
    document.documentElement.style.setProperty("--cgg-wing-left", `url("${leftUrl}")`);
    document.documentElement.style.setProperty("--cgg-wing-right", `url("${rightUrl}")`);

    TooltipHost.create();
    this.bindGlobalDelegation();
    this.bindDays();
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WingedTooltip };
}