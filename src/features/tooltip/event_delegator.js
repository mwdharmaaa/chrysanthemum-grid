/**
 * Chrysanthemum Gold Grid - Tooltip Event Delegator
 */
const TooltipEventDelegator = {
  boundCells: new WeakSet(),
  _delegated: false,

  getCell(target) {
    if (!target || !target.closest) return null;
    return target.closest(".ContributionCalendar-day, [data-level], td[data-date], rect[data-date]");
  },

  bindGlobal(onShow, onHide) {
    if (this._delegated) return;
    this._delegated = true;

    document.addEventListener("mouseover", (e) => {
      const cell = this.getCell(e.target);
      if (cell) onShow(cell);
    }, true);

    document.addEventListener("mouseout", (e) => {
      const cell = this.getCell(e.target);
      if (cell && (!e.relatedTarget || !cell.contains(e.relatedTarget))) {
        onHide();
      }
    }, true);

    document.addEventListener("focusin", (e) => {
      const cell = this.getCell(e.target);
      if (cell) onShow(cell);
    }, true);

    document.addEventListener("focusout", (e) => {
      const cell = this.getCell(e.target);
      if (cell) onHide();
    }, true);
  },

  bindElements(container, onShow, onHide) {
    const root = container || document;
    const days = root.querySelectorAll(".ContributionCalendar-day, [data-level]");
    days.forEach((day) => {
      if (this.boundCells.has(day)) return;
      this.boundCells.add(day);

      day.addEventListener("mouseenter", () => onShow(day));
      day.addEventListener("mouseleave", () => onHide());
      day.addEventListener("focus", () => onShow(day));
      day.addEventListener("blur", () => onHide());
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TooltipEventDelegator };
}
