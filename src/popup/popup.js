/**
 * Chrysanthemum Gold Grid - Popup Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const paletteSelect = document.getElementById("paletteSelect");
  const glowToggle = document.getElementById("glowToggle");
  const hoverToggle = document.getElementById("hoverToggle");
  const bordersToggle = document.getElementById("bordersToggle");
  const wingsToggle = document.getElementById("wingsToggle");
  const buttonsToggle = document.getElementById("buttonsToggle");
  const grand1kToggle = document.getElementById("grand1kToggle");
  const swatchStrip = document.getElementById("swatchStrip");
  const statusMsg = document.getElementById("statusMsg");

  const rowBorders = document.getElementById("rowBorders");
  const rowWings = document.getElementById("rowWings");
  const rowButtons = document.getElementById("rowButtons");
  const rowGrand1k = document.getElementById("rowGrand1k");

  const descBorders = document.getElementById("descBorders");
  const descWings = document.getElementById("descWings");
  const descButtons = document.getElementById("descButtons");
  const descGrand1k = document.getElementById("descGrand1k");

  function updateThemeUI(paletteKey) {
    const isYinYang = paletteKey === "yinYang";
    if (isYinYang) {
      document.body.setAttribute("data-theme", "yinYang");
      if (rowBorders) rowBorders.classList.add("theme-disabled");
      if (rowWings) rowWings.classList.remove("theme-disabled");
      if (rowButtons) rowButtons.classList.add("theme-disabled");
      if (rowGrand1k) rowGrand1k.classList.add("theme-disabled");

      if (descBorders) descBorders.textContent = "Disabled in Yin Yang (Chrysanthemum Gold exclusive)";
      if (descWings) descWings.textContent = "Centered Yin Yang vortex ornament on commit hover";
      if (descButtons) descButtons.textContent = "Disabled in Yin Yang (Chrysanthemum Gold exclusive)";
      if (descGrand1k) descGrand1k.textContent = "Disabled in Yin Yang (Chrysanthemum Gold exclusive)";
    } else {
      document.body.removeAttribute("data-theme");
      if (rowBorders) rowBorders.classList.remove("theme-disabled");
      if (rowWings) rowWings.classList.remove("theme-disabled");
      if (rowButtons) rowButtons.classList.remove("theme-disabled");
      if (rowGrand1k) rowGrand1k.classList.remove("theme-disabled");

      if (descBorders) descBorders.textContent = "Imperial crimson outlines on cards & boxes";
      if (descWings) descWings.textContent = "Royal gold mecha wings on commit hover";
      if (descButtons) descButtons.textContent = "Vibrant crimson style on primary action buttons";
      if (descGrand1k) descGrand1k.textContent = "Regal gold aura & imperial crown on 1,000+ daily commits";
    }
  }

  function updateSwatches(paletteKey, isGlow) {
    const palette = PALETTES[paletteKey] || PALETTES.chrysanthemum;
    const swatches = swatchStrip.querySelectorAll(".swatch");

    const colors = [palette.l0, palette.l1, palette.l2, palette.l3, palette.l4];

    swatches.forEach((swatch, idx) => {
      const color = colors[idx];
      swatch.style.backgroundColor = color;
      swatch.style.borderColor = idx === 0 ? palette.l0Border : color;

      if (idx === 4 && isGlow) {
        swatch.style.boxShadow = `0 0 6px ${palette.glowColor}`;
      } else {
        swatch.style.boxShadow = "none";
      }
    });
  }

  function showStatus(text) {
    if (!statusMsg) return;
    statusMsg.textContent = text;
    setTimeout(() => {
      statusMsg.textContent = "Synced";
    }, 1200);
  }

  function loadSettings() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(DEFAULT_SETTINGS, (stored) => {
        const settings = { ...DEFAULT_SETTINGS, ...stored };
        paletteSelect.value = settings.activePalette;
        glowToggle.checked = settings.enableGlow !== false;
        hoverToggle.checked = settings.enableHoverAnimation !== false;
        if (bordersToggle) bordersToggle.checked = settings.enableCrimsonBorders !== false;
        if (wingsToggle) wingsToggle.checked = settings.enableWingedTooltip !== false;
        if (buttonsToggle) buttonsToggle.checked = settings.enableCrimsonButtons !== false;
        if (grand1kToggle) grand1kToggle.checked = settings.enableGrand1kMilestone !== false;
        updateSwatches(settings.activePalette, settings.enableGlow);
        updateThemeUI(settings.activePalette);
      });
    } else {
      glowToggle.checked = DEFAULT_SETTINGS.enableGlow !== false;
      hoverToggle.checked = DEFAULT_SETTINGS.enableHoverAnimation !== false;
      if (bordersToggle) bordersToggle.checked = DEFAULT_SETTINGS.enableCrimsonBorders !== false;
      if (wingsToggle) wingsToggle.checked = DEFAULT_SETTINGS.enableWingedTooltip !== false;
      if (buttonsToggle) buttonsToggle.checked = DEFAULT_SETTINGS.enableCrimsonButtons !== false;
      if (grand1kToggle) grand1kToggle.checked = DEFAULT_SETTINGS.enableGrand1kMilestone !== false;
      updateSwatches(DEFAULT_SETTINGS.activePalette, DEFAULT_SETTINGS.enableGlow);
      updateThemeUI(DEFAULT_SETTINGS.activePalette);
    }
  }

  function saveSettings() {
    const newSettings = {
      activePalette: paletteSelect.value,
      enableGlow: glowToggle.checked,
      enableHoverAnimation: hoverToggle.checked,
      enableCrimsonBorders: bordersToggle ? bordersToggle.checked : true,
      enableWingedTooltip: wingsToggle ? wingsToggle.checked : true,
      enableCrimsonButtons: buttonsToggle ? buttonsToggle.checked : true,
      enableGrand1kMilestone: grand1kToggle ? grand1kToggle.checked : true
    };

    updateSwatches(newSettings.activePalette, newSettings.enableGlow);
    updateThemeUI(newSettings.activePalette);

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(newSettings, () => {
        showStatus("Saved");
      });
    }
  }

  paletteSelect.addEventListener("change", saveSettings);
  glowToggle.addEventListener("change", saveSettings);
  hoverToggle.addEventListener("change", saveSettings);
  if (bordersToggle) bordersToggle.addEventListener("change", saveSettings);
  if (wingsToggle) wingsToggle.addEventListener("change", saveSettings);
  if (buttonsToggle) buttonsToggle.addEventListener("change", saveSettings);
  if (grand1kToggle) grand1kToggle.addEventListener("change", saveSettings);

  loadSettings();
});