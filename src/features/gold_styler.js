/**
 * Chrysanthemum Gold Grid - Styler Engine Facade
 */
const GoldStyler = {
  applyPaletteTokens(settings = {}) {
    PaletteTokenStyler.apply(settings);
  },

  styleContainer(container, settings = {}) {
    ContainerStyler.style(container, settings);
  },

  styleTypography(settings = {}) {
    TypographyStyler.style(settings);
  },

  styleSparklines(settings = {}) {
    SparklineStyler.style(settings);
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

  applyAll(settings = {}) {
    this.applyPaletteTokens(settings);
    this.styleTypography(settings);
    this.styleSparklines(settings);
    this.styleBorders();
    this.styleNavigation();
    this.styleButtons();
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GoldStyler };
}
