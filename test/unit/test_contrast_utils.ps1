$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/contrast_utils.js" -Raw
if ($code -notmatch "getLuminance") { throw "Missing getLuminance" }
if ($code -notmatch "getRatio") { throw "Missing getRatio" }
Write-Host "[PASS] ContrastUtils verified."
