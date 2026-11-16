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
    const isGrand1k = (this.settings.enableGrand1kMilestone !== false) && count >= 1000;
    const enableWings = this.settings.enableWingedTooltip !== false;

    // Reset old classes
    host.className = `cgg-winged-tooltip cgg-level-${level}`;

    if (isYinYang) {
      host.classList.add("cgg-tooltip-yinyang");

      // Yin Yang keeps the content pill clean (ornament is outside the pill)
      content.textContent = text;

      if (isGrand1k) {
        host.classList.add("cgg-yinyang-1k-tooltip");
        const badge = document.createElement("span");
        badge.className = "cgg-tooltip-yinyang-1k-badge";
        badge.innerHTML = ` <span class="cgg-tooltip-sparkle">☯</span> TRANSCENDENT 1K+`;
        content.appendChild(badge);
      }

      // Positioned outside content pill
      const vortex = host.querySelector(".cgg-yinyang-vortex");
      if (vortex) {
        if (enableWings) {
          const vortexLevelClass = isGrand1k ? "cgg-yinyang-vortex-level-1k" : `cgg-yinyang-vortex-level-${level}`;
          vortex.className = `cgg-yinyang-vortex ${vortexLevelClass}`;
          vortex.title = `Yin Yang Level ${level} (${count} contributions)`;
          vortex.style.display = "";
        } else {
          vortex.style.display = "none";
        }
      }

      // Villain shadow aura layer behind the vortex
      const aura = host.querySelector(".cgg-yinyang-aura");
      if (aura) {
        if (enableWings && (level >= 1 || isGrand1k)) {
          const auraLevelClass = isGrand1k ? "cgg-yinyang-aura-level-1k" : `cgg-yinyang-aura-level-${level}`;
          aura.className = `cgg-yinyang-aura ${auraLevelClass}`;
          aura.style.display = "";
        } else {
          aura.style.display = "none";
        }
      }
      // Dragons flanking card (left: black dragon, right: white dragon)
      const dragonLeft = host.querySelector(".cgg-dragon-left");
      const dragonRight = host.querySelector(".cgg-dragon-right");
      if (dragonLeft && dragonRight) {
        if (enableWings && (level >= 1 || isGrand1k)) {
          const dragonLevelClass = isGrand1k ? "cgg-dragon-level-1k" : `cgg-dragon-level-${level}`;
          dragonLeft.className = `cgg-dragon-flank cgg-dragon-left ${dragonLevelClass}`;
          dragonRight.className = `cgg-dragon-flank cgg-dragon-right ${dragonLevelClass}`;
          dragonLeft.style.display = "";
          dragonRight.style.display = "";
        } else {
          dragonLeft.style.display = "none";
          dragonRight.style.display = "none";
        }
      }
    } else {
      const dragonLeft = host.querySelector(".cgg-dragon-left");
      if (dragonLeft) dragonLeft.style.display = "none";
      const dragonRight = host.querySelector(".cgg-dragon-right");
      if (dragonRight) dragonRight.style.display = "none";

      const vortex = host.querySelector(".cgg-yinyang-vortex");
      if (vortex) {
        vortex.style.display = "none";
      }
      const aura = host.querySelector(".cgg-yinyang-aura");
      if (aura) {
        aura.style.display = "none";
      }

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
    const vortexUrl = TooltipAssetResolver.resolve("yinyang_vortex.png");
    const dragonBlackUrl = TooltipAssetResolver.resolve("dragon_black_left.png");
    const dragonWhiteUrl = TooltipAssetResolver.resolve("dragon_white_right.png");
    document.documentElement.style.setProperty("--cgg-wing-left", `url("${leftUrl}")`);
    document.documentElement.style.setProperty("--cgg-wing-right", `url("${rightUrl}")`);
    document.documentElement.style.setProperty("--cgg-yinyang-vortex", `url("${vortexUrl}")`);
    document.documentElement.style.setProperty("--cgg-dragon-black-left", `url("${dragonBlackUrl}")`);
    document.documentElement.style.setProperty("--cgg-dragon-white-right", `url("${dragonWhiteUrl}")`);

    TooltipHost.create();
    this.bindGlobalDelegation();
    this.bindDays();
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WingedTooltip };
}