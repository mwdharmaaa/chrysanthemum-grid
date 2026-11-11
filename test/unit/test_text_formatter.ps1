$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/text_formatter.js" -Raw
if ($code -notmatch "formatFallback") { throw "Missing formatFallback" }
if ($code -notmatch "data-date") { throw "Missing data-date query" }
if ($code -notmatch "aria-label") { throw "Missing aria-label fallback" }
Write-Host "[PASS] Text formatter fallbacks verified."
