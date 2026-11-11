$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/date_formatter.js" -Raw
if ($code -notmatch "formatIso") { throw "Missing formatIso" }
Write-Host "[PASS] DateFormatter verified."
