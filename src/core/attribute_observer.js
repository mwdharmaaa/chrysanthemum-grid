const AttributeObserver = {
  createObserver(callback) {
    return new MutationObserver((mutations) => {
      callback(mutations);
    });
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { AttributeObserver };
