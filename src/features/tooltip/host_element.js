/**
 * Chrysanthemum Gold Grid - Tooltip Host Element Builder
 */
const TooltipHost = {
  element: null,
  content: null,

  create() {
    if (this.element && document.body.contains(this.element)) return this.element;

    const host = document.createElement("div");
    host.className = "cgg-winged-tooltip";
    host.id = "cggWingedTooltip";
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = '<span class="cgg-crimson-halo"></span>' +
                     '<span class="cgg-yinyang-aura"></span>' +
                     '<span class="cgg-yinyang-vortex"></span>' +
                     '<span class="cgg-dragon-flank cgg-dragon-left">' +
                       '<span class="cgg-dragon-aura-tendrils"></span>' +
                       '<span class="cgg-dragon-aura-smoke"></span>' +
                       '<span class="cgg-dragon-body"></span>' +
                     '</span>' +
                     '<span class="cgg-winged-tooltip-wing cgg-winged-tooltip-wing-left"></span>' +
                     '<span class="cgg-winged-tooltip-content"></span>' +
                     '<span class="cgg-winged-tooltip-wing cgg-winged-tooltip-wing-right"></span>' +
                     '<span class="cgg-dragon-flank cgg-dragon-right">' +
                       '<span class="cgg-dragon-aura-tendrils"></span>' +
                       '<span class="cgg-dragon-aura-smoke"></span>' +
                       '<span class="cgg-dragon-body"></span>' +
                     '</span>';

    document.body.appendChild(host);
    this.element = host;
    this.content = host.querySelector(".cgg-winged-tooltip-content");
    return host;
  },

  getElement() {
    return this.element || this.create();
  },

  getContentElement() {
    if (!this.content) this.create();
    return this.content;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipHost };
}
