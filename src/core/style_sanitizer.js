const StyleSanitizer = {
  sanitizePx(val) {
    const num = parseFloat(val);
    return isNaN(num) ? "0px" : `${Math.round(num)}px`;
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { StyleSanitizer };
