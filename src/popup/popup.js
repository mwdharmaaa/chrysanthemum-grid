/**
 * Chrysanthemum Gold Grid - Popup Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const paletteSelect = document.getElementById("paletteSelect");
  const glowToggle = document.getElementById("glowToggle");
  const hoverToggle = document.getElementById("hoverToggle");
  const swatchStrip = document.getElementById("swatchStrip");
  const statusMsg = document.getElementById("statusMsg");

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
        glowToggle.checked = settings.enableGlow;
        hoverToggle.checked = settings.enableHoverAnimation;
        updateSwatches(settings.activePalette, settings.enableGlow);
      });
    } else {
      updateSwatches(DEFAULT_SETTINGS.activePalette, DEFAULT_SETTINGS.enableGlow);
    }
  }

  function saveSettings() {
    const newSettings = {
      activePalette: paletteSelect.value,
      enableGlow: glowToggle.checked,
      enableHoverAnimation: hoverToggle.checked
    };

    updateSwatches(newSettings.activePalette, newSettings.enableGlow);

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(newSettings, () => {
        showStatus("Saved");
      });
    }
  }

  paletteSelect.addEventListener("change", saveSettings);
  glowToggle.addEventListener("change", saveSettings);
  hoverToggle.addEventListener("change", saveSettings);

  loadSettings();
});
