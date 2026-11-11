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

  show(dayEl) {
    const host = TooltipHost.create();
    const content = TooltipHost.getContentElement();
    const text = TooltipTextFormatter.resolve(dayEl);
    content.textContent = text;

    const level = TooltipLevelExtractor.extract(dayEl, text);
    host.className = `cgg-winged-tooltip cgg-level-${level}`;
    if (level === 3 || level === 4) {
      host.classList.add("has-wings");
    }
    if (level === 4) {
      host.classList.add("has-halo");
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

  init() {
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
