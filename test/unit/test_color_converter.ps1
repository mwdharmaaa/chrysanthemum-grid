$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/color_converter.js" -Raw
if ($code -notmatch "hexToRgb") { throw "Missing hexToRgb" }
if ($code -notmatch "rgbToHex") { throw "Missing rgbToHex" }
Write-Host "[PASS] ColorConverter verified."
