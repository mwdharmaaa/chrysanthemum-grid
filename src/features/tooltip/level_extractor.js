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
      const match = lower.match(/^([\d,.]+)\s+(?:contribution|commit)/);
      if (match) {
        const clean = match[1].replace(/[,.]/g, "");
        const count = parseInt(clean, 10);
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 9) return 3;
        return 4;
      }
    }
    return 0;
  },

  extractCount(dayEl, text) {
    if (dayEl && typeof dayEl.getAttribute === "function") {
      const rawCount = dayEl.getAttribute("data-count");
      if (rawCount !== null && rawCount !== undefined && rawCount !== "") {
        const parsed = parseInt(String(rawCount).replace(/[,.]/g, ""), 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    if (text) {
      const match = text.match(/([\d,.]+)\s+(?:contribution|commit)/i);
      if (match) {
        return parseInt(match[1].replace(/[,.]/g, ""), 10) || 0;
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
