/**
 * Chrysanthemum Gold Grid - Tooltip Asset Resolver
 */
const TooltipAssetResolver = {
  resolve(filename) {
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL) {
      return chrome.runtime.getURL(`src/assets/${filename}`);
    }
    return `../src/assets/${filename}`;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipAssetResolver };
}
