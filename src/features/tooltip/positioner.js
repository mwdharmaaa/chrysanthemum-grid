/**
 * Chrysanthemum Gold Grid - Tooltip Positioner
 */
const TooltipPositioner = {
  compute(dayEl) {
    const rect = dayEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const topY = rect.top;
    return {
      left: Math.round(centerX),
      top: Math.round(topY)
    };
  },

  apply(element, coords) {
    if (!element || !coords) return;
    element.style.left = `${coords.left}px`;
    element.style.top = `${coords.top}px`;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipPositioner };
}
