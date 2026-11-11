const DomSafeQuery = {
  safeSelect(selector, root = document) {
    try {
      return root.querySelector(selector);
    } catch {
      return null;
    }
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { DomSafeQuery };
