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
    const container = CalendarObserver.findCalendarContainer();
    if (container) {
      GoldStyler.styleContainer(container, currentSettings);
    }
  }

  function bootstrap() {
    loadSettings(() => {
      applyActiveTheme();

      CalendarObserver.init((container) => {
        GoldStyler.applyPaletteTokens(currentSettings);
        GoldStyler.styleTypography(currentSettings);
        GoldStyler.styleContainer(container, currentSettings);
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
