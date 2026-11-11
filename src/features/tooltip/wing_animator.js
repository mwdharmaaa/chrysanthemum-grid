const WingAnimator = {
  applyBobbing(leftWing, rightWing) {
    if (leftWing) leftWing.classList.add("cgg-anim-flutter");
    if (rightWing) rightWing.classList.add("cgg-anim-flutter");
  }
};
if (typeof module !== "undefined" && module.exports) module.exports = { WingAnimator };
