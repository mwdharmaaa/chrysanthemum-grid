const ThemeValidator = {
  isValidHex(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { ThemeValidator };
