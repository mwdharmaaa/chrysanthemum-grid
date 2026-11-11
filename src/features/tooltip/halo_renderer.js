const HaloRenderer = {
  render(parent) {
    let halo = parent.querySelector(".cgg-crimson-halo");
    if (!halo) {
      halo = document.createElement("span");
      halo.className = "cgg-crimson-halo";
      parent.prepend(halo);
    }
    return halo;
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { HaloRenderer };
