# Chrysanthemum Gold Grid

Chrome Manifest V3 extension transforming GitHub contribution squares from default green into the Chrysanthemum Prince royal gold palette.

Designed specifically to match the profile aesthetic of [@mwdharmaaa](https://github.com/mwdharmaaa).

---

## Architecture Overview

```text
┌────────────────────────────────────────────────────────┐
│                   GitHub Profile Page                  │
│       (.js-calendar-graph / ContributionCalendar)      │
└───────────────────────────┬────────────────────────────┘
                            │ Mutates / SPA Turbo Load
┌───────────────────────────▼────────────────────────────┐
│      CalendarObserver (src/features/calendar_observer) │
│    - Listens to turbo:load, turbo:render, soft-nav     │
│    - Debounced mutation watcher for AJAX year flips    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│         GoldStyler (src/features/gold_styler)          │
│    - Overrides CSS variables (--cgg-l0 .. --cgg-l4)    │
│    - Transforms repo sparkline graphs into royal gold  │
│    - Injects Level 4 radial bloom / glow               │
│    - Attaches "Gold" status pill to summary header     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│      WingedTooltip (src/features/winged_tooltip)       │
│    - Flanks daily commit hover tooltip with royal gold │
│      wings and floating dynamics                       │
│    - Integrates with Primer <tool-tip> and calendar    │
└───────────────────────────▲────────────────────────────┘
                            │ Syncs Storage
┌───────────────────────────┴────────────────────────────┐
│           Popup UI (src/popup/popup.html)              │
│    - Linear-grade dark theme controller                │
│    - Swatch selector (Chrysanthemum, Amber, Liquid)    │
│    - Glow and hover dynamics toggles                   │
└────────────────────────────────────────────────────────┘
```

---

## Palette Hierarchy

| Contribution Level | Color Code | Description |
| :--- | :--- | :--- |
| Level 0 (Zero) | `#16202c` | Deep Midnight Slate (avatar backdrop) |
| Level 1 (Low) | `#6a4a1a` | Dark Warm Bronze |
| Level 2 (Medium) | `#a37226` | Antique Chrysanthemum Gold |
| Level 3 (High) | `#dda034` | Radiant Petal Gold |
| Level 4 (Peak) | `#ffcb47` | Imperial Crown Gold with Radial Aura Glow |

---

## Quickstart & Development

### 1. Launch in Isolated Dev Profile (One-Enter)

Windows PowerShell:
```powershell
.\runapp.ps1
```

Linux / macOS / Git Bash:
```bash
./runapp.sh
```

### 2. Manual Installation in Chrome

1. Open Google Chrome and go to `chrome://extensions`.
2. Enable **Developer mode** in the upper right corner.
3. Click **Load unpacked**.
4. Select the directory: `space/project/tools/ext/chrysanthemum-grid`.
5. Navigate to any GitHub profile page (e.g., `https://github.com/mwdharmaaa`).

### 3. Running Automated Integrity Tests

Windows PowerShell:
```powershell
.\test.ps1
```

Linux / macOS / Git Bash:
```bash
./test.sh
```

---

## File Structure

```text
chrysanthemum-grid/
├── manifest.json                  # Manifest V3 specification
├── icons/                         # Visual brand assets
│   ├── icon.svg
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── src/
│   ├── assets/                    # Tooltip ornament assets
│   │   ├── wing_left.png
│   │   └── wing_right.png
│   ├── content_main.js            # Content script entry point
│   ├── core/
│   │   └── palette_config.js      # Palette tokens & defaults
│   ├── features/
│   │   ├── calendar_observer.js   # Turbo & DOM mutation watcher
│   │   ├── gold_styler.js         # Reactive CSS variable injector
│   │   └── winged_tooltip.js      # Royal gold winged tooltip engine
│   ├── styles/
│   │   ├── chrysanthemum.css      # Scoped styling & glow rules
│   │   ├── gold_typography.css    # Blue links & accent text to gold
│   │   └── winged_tooltip.css     # Royal gold wings & hover floating animations
│   └── popup/
│       ├── popup.html             # Extension controller UI
│       ├── popup.css              # Linear-grade dark UI styling
│       └── popup.js               # Reactive settings storage sync
├── test/
│   └── test_page.html             # Standalone offline test harness
├── runapp.ps1                     # Windows dev launcher
├── runapp.sh                      # POSIX dev launcher
├── test.ps1                       # Windows integrity suite
├── test.sh                        # POSIX integrity suite
├── .gitignore
└── README.md
```
