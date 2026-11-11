const EventDebouncer = {
  debounce(fn, waitMs = 50) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), waitMs);
    };
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { EventDebouncer };
