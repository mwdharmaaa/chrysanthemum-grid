/**
 * Chrysanthemum Gold Grid - Tooltip Text Formatter
 */
const TooltipTextFormatter = {
  formatFallback(dayEl) {
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

  resolve(dayEl) {
    const dayId = dayEl.getAttribute("id");
    if (dayId) {
      const linkedTip = document.querySelector(`tool-tip[for="${dayId}"]`);
      if (linkedTip && linkedTip.textContent.trim()) {
        return linkedTip.textContent.trim();
      }
    }
    const aria = dayEl.getAttribute("aria-label");
    if (aria && aria.trim()) return aria.trim();

    const title = dayEl.getAttribute("title");
    if (title && title.trim()) return title.trim();

    return this.formatFallback(dayEl);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipTextFormatter };
}
