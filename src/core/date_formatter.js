const DateFormatter = {
  formatIso(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { DateFormatter };
