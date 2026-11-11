/**
 * Chrysanthemum Gold Grid - Tooltip Level Extractor
 */
const TooltipLevelExtractor = {
  extract(dayEl, text) {
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
    return this.extract(dayEl, text) > 0;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipLevelExtractor };
}
