/**
 * Chrysanthemum Gold Grid - Tooltip Asset Resolver
 */
const TooltipAssetResolver = {
  resolve(filename) {
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.id && typeof chrome.runtime.getURL === "function") {
        return chrome.runtime.getURL(`src/assets/${filename}`);
      }
    } catch {
      // Gracefully handle invalidated extension context after extension update/reload
    }
    return `../src/assets/${filename}`;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipAssetResolver };
}
