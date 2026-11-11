$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/gold_styler.js" -Raw
if ($code -notmatch "GoldStyler") { throw "Missing GoldStyler" }
if ($code -notmatch "applyPaletteTokens") { throw "Missing applyPaletteTokens" }
if ($code -notmatch "styleContainer") { throw "Missing styleContainer" }
if ($code -notmatch "styleTypography") { throw "Missing styleTypography" }
Write-Host "[PASS] GoldStyler facade verified."
