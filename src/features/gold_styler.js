/**
 * Chrysanthemum Gold Grid - Styler Engine Facade
 */
const GoldStyler = {
  styleSparklines() {
    SparklineStyler.style();
  },

  styleBorders() {
    BorderStyler.style();
  },

  styleNavigation() {
    NavigationStyler.style();
  },

  styleButtons() {
    ButtonStyler.style();
  },

  injectThemeTokens(tokens) {
    CssInjector.injectTokens(tokens);
  },

  applyAll(tokens) {
    if (tokens) this.injectThemeTokens(tokens);
    this.styleSparklines();
    this.styleBorders();
    this.styleNavigation();
    this.styleButtons();
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GoldStyler };
}
