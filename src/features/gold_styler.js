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

  styleBorders(settings = {}) {
    if (typeof BorderStyler !== "undefined") {
      BorderStyler.style(settings);
    }
  },

  styleNavigation(settings = {}) {
    if (typeof NavigationStyler !== "undefined") {
      NavigationStyler.style(settings);
    }
  },

  styleButtons(settings = {}) {
    if (typeof ButtonStyler !== "undefined") {
      ButtonStyler.style(settings);
    }
  },

  injectThemeTokens(tokens) {
    if (typeof CssInjector !== "undefined") {
      CssInjector.injectTokens(tokens);
    }
  },

  applyAll(settings = {}) {
    this.applyPaletteTokens(settings);
    this.styleTypography(settings);
    this.styleSparklines(settings);
    this.styleBorders(settings);
    this.styleNavigation(settings);
    this.styleButtons(settings);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GoldStyler };
}
