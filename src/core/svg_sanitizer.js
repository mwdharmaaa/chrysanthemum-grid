const SvgSanitizer = {
  sanitizeFill(fill) {
    if (!fill || fill === "none") return "none";
    return fill.replace(/[\r\n\t]/g, "").trim();
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { SvgSanitizer };
