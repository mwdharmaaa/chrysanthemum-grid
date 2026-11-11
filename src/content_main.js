/**
 * Chrysanthemum Gold Grid - Content Main Entry Point
 */

(function () {
  let currentSettings = { ...DEFAULT_SETTINGS };

  function loadSettings(callback) {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(DEFAULT_SETTINGS, (stored) => {
        currentSettings = { ...DEFAULT_SETTINGS, ...stored };
        callback(currentSettings);
      });
    } else {
      callback(currentSettings);
    }
  }

  function applyActiveTheme() {
    GoldStyler.applyPaletteTokens(currentSettings);
    GoldStyler.styleTypography(currentSettings);
    GoldStyler.styleSparklines(currentSettings);
    GoldStyler.styleBorders(currentSettings);
    if (typeof WingedTooltip !== "undefined") {
      WingedTooltip.init();
    }
    const container = CalendarObserver.findCalendarContainer();
    if (container) {
      GoldStyler.styleContainer(container, currentSettings);
      if (typeof WingedTooltip !== "undefined") {
        WingedTooltip.bindDays(container);
      }
    }
  }

  function bootstrap() {
    loadSettings(() => {
      applyActiveTheme();

      CalendarObserver.init((container) => {
        applyActiveTheme();
      });
    });

    // Reactive update when settings change in popup
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local") {
          for (const key of Object.keys(changes)) {
            currentSettings[key] = changes[key].newValue;
          }
          applyActiveTheme();
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
