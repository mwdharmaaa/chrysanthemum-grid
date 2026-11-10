/**
 * Chrysanthemum Gold Grid - Calendar Observer
 * Detects GitHub Turbo SPA navigation and dynamic AJAX calendar year swaps.
 */

const CalendarObserver = {
  CALENDAR_SELECTORS: [
    ".js-calendar-graph",
    ".js-calendar-graph-svg",
    "table.ContributionCalendar-grid"
  ],

  observer: null,
  debounceTimer: null,

  findCalendarContainer() {
    for (const selector of this.CALENDAR_SELECTORS) {
      const el = document.querySelector(selector);
      if (el) return el;
    }
    return null;
  },

  init(onCalendarFound) {
    const trigger = () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        const calendar = this.findCalendarContainer();
        if (calendar) {
          onCalendarFound(calendar);
        }
      }, 50);
    };

    // Initial pass
    trigger();

    // Turbo / PJAX event listeners
    document.addEventListener("turbo:load", trigger);
    document.addEventListener("turbo:render", trigger);
    document.addEventListener("pjax:end", trigger);
    document.addEventListener("soft-nav:end", trigger);

    // MutationObserver on profile parent frame
    const targetNode = document.querySelector("#user-profile-frame") || document.body;
    if (targetNode) {
      this.observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            trigger();
            break;
          }
        }
      });

      this.observer.observe(targetNode, {
        childList: true,
        subtree: true
      });
    }
  },

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CalendarObserver };
}
