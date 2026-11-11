/**
 * Chrysanthemum Gold Grid - CSS Dynamic Injector
 */
const CssInjector = {
  injectTokens(tokens) {
    if (!tokens || typeof tokens !== "object") return;
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CssInjector };
}
