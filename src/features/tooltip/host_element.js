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
                     '<span class="cgg-winged-tooltip-wing cgg-winged-tooltip-wing-left"></span>' +
                     '<span class="cgg-winged-tooltip-content"></span>' +
                     '<span class="cgg-winged-tooltip-wing cgg-winged-tooltip-wing-right"></span>';

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
